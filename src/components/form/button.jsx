import * as React from 'react';
import './button.sass';

export default class TextInput extends React.PureComponent {
  render() {
    const { className, children, onClick } = this.props;
    return <button onClick={onClick} className={`${className ? className : ''} gloot-button`}>{children}</button>;
  }
}
