import * as React from 'react';
import { connect } from 'react-redux';
import { getPaymentMethods, test } from '../../services/paymentiq-service';
import { ActionCreators as paymentActionCreators } from '../../store/payment/reducer';
import './methods.sass';

const mapStateToProps = state => ({
  methods: state.payment.methods,
});

const dispatchToProps = {
  setMethods: paymentActionCreators.setMethods.create,
  setSelectedMethod: paymentActionCreators.setSelectedMethod.create,
};

const providerToIconMap = {
  CREDITCARD: 'fas fa-credit-card',
  BANK: 'fas fa-university',
  PAYPAL: 'fab fa-paypal',
  SKRILL: 'fas fa-piggy-bank',
};

class MethodsContainer extends React.Component {
  async componentDidMount() {
    const { setMethods, methods } = this.props;
    if (!methods || !methods.length) {
      const resp = await getPaymentMethods();
      setMethods(resp.data[0].methods);
    }
  }

  handleSelectMethod = method => {
    this.props.setSelectedMethod(method);
    this.props.history.push(`/method/${method.providerType.toLowerCase()}${location.search}`);
  };

  render() {
    const { methods } = this.props;
    return (
      <section className="methods-container">
        <div className="divider" />
        <label>SELECT METHOD</label>
        {methods.map(method => (
          <div onClick={() => this.handleSelectMethod(method)} key={method.txType} className="payment-method">
            <i className={providerToIconMap[method.providerType]} /> {method.providerType}
          </div>
        ))}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(MethodsContainer);
