import * as React from 'react';
import Input from '../form/text-input';

export default class TextInput extends React.PureComponent {
  render() {
    const {
      meta,
      input,
      className,
      label,
      placeholder,
      type,
      valueOverride,
    } = this.props;
    return (
      <Input
        errorMsg={meta && meta.touched && (meta.error || meta.submitError)}
        valid={meta && meta.valid && !meta.pristine}
        invalid={meta && !meta.valid && !meta.pristine}
        className={className}
        placeholder={placeholder}
        input={input}
        label={label}
        value={valueOverride || input.value}
      />
    );
  }
}
