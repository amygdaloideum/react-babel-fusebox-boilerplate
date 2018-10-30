import * as React from 'react';
import './text-input.sass';

export default class TextInput extends React.PureComponent {
  render() {
    const {
      value, onChange, className, icon, label, placeholder, valid, invalid, errorMsg, disabled,
    } = this.props;
    let iconClass = icon;
    let statusClass = '';
    if (valid) {
      iconClass = 'icon-check';
      statusClass = 'is-valid';
    } else if (invalid) {
      iconClass = 'icon-cancel';
      statusClass = 'is-invalid';
    } else if (disabled) {
      iconClass = 'icon-padlock-closed';
      statusClass = 'is-disabled';
    }
    const noop = () => {};
    return (
      <div className={`${className} gloot-input`}>
        <div className="label-container">
          <label>{label}</label>
          <span>{errorMsg}</span>
        </div>
        <div className={`input-container ${statusClass}`}>
          <input onChange={onChange || noop} type="text" placeholder={placeholder} value={value} disabled={disabled} />
          {(icon || disabled || valid || invalid) && (
            <span className="icon-container">
              <i className={iconClass} />
            </span>
          )}
        </div>
      </div>
    );
  }
}
