import * as React from 'react';
import './method.sass';
import { connect } from 'react-redux';
import { getPaymentMethods } from '../../services/paymentiq-service';
import { ActionCreators as paymentActionCreators } from '../../store/payment/reducer';
import { startPaymentProcess } from '../../services/paymentiq-service';
import queryParams from '../../utils/query-params';
import containerTypes from '../../utils/container-types';
import formRedirect from '../../utils/form-redirect';
import Spinner from '../../components/spinner';
import { encryptFormData } from '../../utils/encrypt';
import { getItem, setItem } from '../../utils/storage';

import GeneralForm from './forms/general-form';
import CreditCardForm from './forms/credit-card-form';

const mapStateToProps = state => ({
  method: state.payment.selectedMethod,
  methods: state.payment.selectedMethod,
});

const dispatchToProps = {
  setMethods: paymentActionCreators.setMethods.create,
  setSelectedMethod: paymentActionCreators.setSelectedMethod.create,
};

class MethodContainer extends React.Component {
  state = {
    errorList: [],
    loading: false,
  };

  async componentDidMount() {
    const { setMethods, methods, setSelectedMethod, match } = this.props;
    if (!methods || !methods.length) {
      const resp = await getPaymentMethods();
      const recievedMethods = resp.data[0].methods;
      setMethods(recievedMethods);
      const selectedMethod = recievedMethods.find(
        txMethod => txMethod.providerType.toLowerCase() === match.params.txType
      );
      setSelectedMethod(selectedMethod);
    }
  }

  getInitialValues = method => {
    const initialValues = {};
    method &&
      method.txTypeInput.inputs
        .filter(input => input.key !== 'amount')
        .map(input => (initialValues[input.name] = input.val));
    return initialValues;
  };

  handleErrors = errors => {
    const formValidationObj = {};
    const errorList = [];
    errors.forEach(error => {
      if (error.field) {
        formValidationObj[error.field] = error.msg;
      } else {
        errorList.push(error);
      }
    });
    this.setState({ errorList, loading: false });
    return formValidationObj;
  };

  handleRedirect = redirectOutput => {
    if (redirectOutput.container === containerTypes.WINDOW) {
      if (redirectOutput.method == 'GET') {
        window.location.href = redirectOutput.url;
      } else if (redirectOutput.method == 'POST') {
        formRedirect(redirectOutput.url, redirectOutput.parameters);
      }
    } else if (redirectOutput.container === containerTypes.IFRAME) {
    }
  };

  onSubmit = async values => {
    this.setState({ errorList: [], loading: true });
    const body = await encryptFormData(values);
    const response = await startPaymentProcess({
      txMethod: this.props.method.providerType.toLowerCase(),
      txType: queryParams.txType,
      body: body,
    });
    // show eventual errors in form
    if (!response.success && response.errors && response.errors.length > 0) {
      return this.handleErrors(response.errors);
    }
    //Process was sucessful
    if (response.messages) {
      // save messages in local storage for use when
      setItem('messages', response.messages);
      setItem('txState', response.txState);
    }
    if (response.redirectOutput) {
      this.handleRedirect(response.redirectOutput);
    } else {
      this.props.history.push(`/success/${location.search}`);
    }
  };

  render() {
    const { method } = this.props;
    const { errorList, loading } = this.state;
    const initialValues = this.getInitialValues(method);
    return (
      <section className="method-container">
        <div className="divider" />
        {errorList.length > 0 && (
          <div className="method-error-container p2">
            {errorList.map((error, i) => (
              <div key={i}>{error.msg}</div>
            ))}
          </div>
        )}
        {method && (
          <div className={`${loading ? 'display-none' : ''}`}>
            <div>
              {(() => {
                switch (method.providerType) {
                  case 'CREDITCARD':
                    return <CreditCardForm method={method} onSubmit={this.onSubmit} initialValues={initialValues} />;
                  default:
                    return <GeneralForm method={method} onSubmit={this.onSubmit} initialValues={initialValues} />;
                }
              })()}
            </div>
          </div>
        )}
        {loading && (
          <div className="method-loading-container">
            <h2>please stand by</h2>
            <h3>you are being redirected to your payment provider</h3>
            <Spinner />
          </div>
        )}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(MethodContainer);
