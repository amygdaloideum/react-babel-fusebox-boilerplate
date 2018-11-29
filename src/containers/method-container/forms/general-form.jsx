import React from 'react';
import TextInput from '../../../components/final-form-wrappers/text-input';
import Button from '../../../components/form/button';
import { Form, Field } from 'react-final-form';

export default class GeneralForm extends React.Component {
  render() {
    const { initialValues, onSubmit, method } = this.props;
    return (
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <label>{method.providerType}</label>
            <div className="method-form-container">
              {/* Amount is fixed and should not be changeable */}
              {method.txTypeInput.inputs
                .filter(i => i.key !== 'amount' && i.type !== 'HIDDEN')
                .map(input => (
                  <div key={input.name}>
                    <Field label={input.name} name={input.name} component={TextInput} />
                  </div>
                ))}
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
