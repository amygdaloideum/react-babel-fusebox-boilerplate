import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { getPaymentMethods, test } from '../../services/paymentiq-service';
import { ActionCreators as paymentActionCreators } from '../../store/payment/reducer';
import TextInput from '../../components/final-form-wrappers/text-input';
import Button from '../../components/form/button';

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

  onSubmit = async values => {
    console.log('dick');
  };

  render() {
    const { method } = this.props;
    return (
      <section className="method-container">
        <div className="divider" />
        {method && (
          <div>
            <label>{method.providerType}</label>
            <div>
              <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit, pristine, invalid }) => (
                  <form onSubmit={handleSubmit}>
                    {method.txTypeInput.inputs.map(input => (
                      <div>
                        {input.type !== 'HIDDEN' && (
                          <Field label={input.name} name={input.name} component={TextInput} />
                        )}
                      </div>
                    ))}

                    <button type="submit" disabled={pristine || invalid}>
                      Submit
                    </button>
                  </form>
                )}
              />
            </div>
            <div>
              <Button className="fl-end mt2">next</Button>
            </div>
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
