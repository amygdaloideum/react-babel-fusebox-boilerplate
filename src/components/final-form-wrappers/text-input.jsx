import * as React from 'react';
import Input from '../form/text-input';

export default class TextInput extends React.PureComponent {
  render() {
    const { meta, input: { onChange, value }, className, label, placeholder, type, } = this.props;
    return (
      <Input
        errorMsg={meta && meta.touched && meta.error}
        valid={meta && meta.valid && !meta.pristine}
        invalid={meta && !meta.valid && !meta.pristine}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        label={label}
        value={value}
      />
    );
  }
}