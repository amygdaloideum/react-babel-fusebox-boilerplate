import * as React from 'react';
import { connect } from 'react-redux';
import { getPaymentMethods, test } from '../../services/paymentiq-service';
import { ActionCreators as paymentActionCreators } from '../../store/payment/reducer';

const mapStateToProps = state => ({
  method: state.payment.selectedMethod,
  methods: state.payment.selectedMethod,
});

const dispatchToProps = {
  setMethods: paymentActionCreators.setMethods.create,
  setSelectedMethod: paymentActionCreators.setSelectedMethod.create,
};

class MethodContainer extends React.Component {
  async componentDidMount() {
    const { setMethods, methods, setSelectedMethod, match } = this.props;
    if (!methods) {
      const resp = await getPaymentMethods();
      const recievedMethods = resp.data[0].methods;
      setMethods(recievedMethods);
      const selectedMethod = recievedMethods.find(
        txMethod => txMethod.providerType.toLowerCase() === match.params.txType
      );
      setSelectedMethod(selectedMethod);
    }
  }

  render() {
    const { method } = this.props;
    return (
      <section className="methods-container">
        <div className="divider" />
        <label>{method.providerType}</label>
        {method.txTypeInput.inputs.map(input => (
          <div>
            <input />
          </div>
        ))}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(MethodContainer);
