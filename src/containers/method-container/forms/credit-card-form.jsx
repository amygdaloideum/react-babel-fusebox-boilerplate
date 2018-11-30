import React from 'react';
import TextInput from '../../../components/final-form-wrappers/text-input';
import Button from '../../../components/form/button';
import { Form, Field } from 'react-final-form';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from '../../../utils/credit-card';

export default class CreditCardForm extends React.Component {
  /**
   * @desc Format the values to comply with the PaymentIQ api.
   * The reason why we dont use the general form for this is
   * because we want to use the react-credit-cards lib and also
   * customize the layout and function of the fields. If the name
   * of the fields are renamed the react-credit-card component will
   * not work properly.
   * 
   * The following formatting is done:
   * rename prop: cvc => cvv
   * rename prop: name => cardHolder
   * rename prop: number => creditCardNumber
   * split prop: expiry (05/20) => expiryMonth (05) & expiryYear (2020)
   * 
   * reference: https://docs.paymentiq.io/europe/front/appendixcc/creditcard
   */
  formatOutputValues = values => {
    return {
      creditcardNumber: values.number,
      cardHolder: values.name,
      expiryMonth: values.expiry.split('/')[0],
      expiryYear: '20' + values.expiry.split('/')[1],
      cvv: values.cvc,
    };
    return this.props.onSubmit(values);
  }

  /** 
   * @desc Function that wraps the submit function to map
   * the errors to the custom fields.
  */
  formatErrors = async errorObj => {
    return {
      number: errorObj.creditcardNumber && 'invalid',
      name: errorObj.cardHolder && 'invalid',
      expiry: (errorObj.expiryMonth || errorObj.expiryYear) && 'invalid',
      cvc: errorObj.cvv && 'invalid',
    };
  }

  onSubmitWrapper = async values => {
    const formattedValues = this.formatOutputValues(values);
    const errorObj = await this.props.onSubmit(formattedValues);
    return this.formatErrors(errorObj);
  }

  formatInitialValues = iv => {
    return {
      number: iv.creditcardNumber,
      name: iv.cardHolder,
      expiry: iv.expiryMonth && iv.expiryYear && `${iv.expiryMonth}/${iv.expiryYear.substring(2,4)}`,
      cvc: iv.cvv,
    };
  }
  render() {
    const { initialValues, onSubmit, method } = this.props;
    return (
      <Form
        initialValues={this.formatInitialValues(initialValues)}
        onSubmit={this.onSubmitWrapper}
        render={({ handleSubmit, reset, submitting, pristine, values, active }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt2 mb3">
              <Cards
                number={values.number || ''}
                name={values.name || ''}
                expiry={values.expiry || ''}
                cvc={values.cvc || ''}
                focused={active}
              />
            </div>
            <div className="method-form-container">
              <Field
                label="creditcard number"
                pattern="[\d| ]{16,22}"
                name="number"
                format={formatCreditCardNumber}
                component={TextInput}
              />
              <Field
                label="card holder"
                name="name"
                component={TextInput}
              />
              <div className="flex items-center">
                <div className="mr1">
                  <Field
                    label="expiry date"
                    placeholder="mm/yy"
                    name="expiry"
                    component={TextInput}
                    pattern="\d\d/\d\d"
                    format={formatExpirationDate}
                  />
                </div>
                <div>
                  <Field
                    label="cvv"
                    name="cvc"
                    component={TextInput}
                    type="text"
                    pattern="\d{3,4}"
                    format={formatCVC}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" disabled={pristine} className="fl-end mt2">
              next
            </Button>
          </form>
        )}
      />
    );
  }
}
