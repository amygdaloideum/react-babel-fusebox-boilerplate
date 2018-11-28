import * as React from 'react';
import { connect } from 'react-redux';
import { getTxStatus } from '../../services/paymentiq-service';
import { ActionCreators as paymentActionCreators } from '../../store/payment/reducer';
import queryParams from '../../utils/query-params';
import { getItem } from '../../utils/storage';
import './success.sass';

const mapStateToProps = state => ({});

const dispatchToProps = {};

class SuccessContainer extends React.Component {
  state = { messages: [] };

  async componentDidMount() {
    //getTxStatus({ txId: queryParams.txId });
    // get messages from localstorage
    const messages = getItem();
    this.setState({ messages: messages || [] });
  }

  render() {
    const { messages } = this.state;
    return (
      <section className="success-container">
        <div className="divider" />
        <div className="flex flex-column items-center justify-center success-sign">
          <i className="fa fa-check c-main" />
          <h1 className="c-main">SUCCESS</h1>
        </div>
        <table className="message-list mt3">
          <tbody>
            {messages &&
              messages.filter(m => m.value).map((message, i) => (
                <tr key={i}>
                  <td>{message.label}</td>
                  <td>{message.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(SuccessContainer);
