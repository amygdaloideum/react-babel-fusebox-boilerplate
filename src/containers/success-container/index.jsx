import * as React from 'react';
import { connect } from 'react-redux';
import { getTxStatus } from '../../services/paymentiq-service';
import { ActionCreators as paymentActionCreators } from '../../store/payment/reducer';
import queryParams from '../../utils/query-params';
import Button from '../../components/form/button';
import { getItem } from '../../utils/storage';
import './success.sass';

const txStates = {
  WAITING_APPROVAL: 'WAITING_APPROVAL',
};

const mapStateToProps = state => ({});

const dispatchToProps = {};

class SuccessContainer extends React.Component {
  state = { messages: [] };

  async componentDidMount() {
    //getTxStatus({ txId: queryParams.txId });
    // get messages from localstorage
    const messages = getItem('messages');
    const txState = getItem('txState');
    this.setState({ txState, messages: messages || [] });
  }

  extractHostname = url => {
    var hostname;
    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
  };

  extractRootDomain = url => {
    var domain = this.extractHostname(url),
      splitArr = domain.split('.'),
      arrLen = splitArr.length;

    if (arrLen > 2) {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
  };

  navigateBack = () => {
    window.location.href = queryParams.redirectUrl;
  }

  render() {
    const { messages, txState } = this.state;
    return (
      <section className="success-container">
        <div className="divider" />
        {txState === txStates.WAITING_APPROVAL ? (
          <div className="flex flex-column items-center justify-center withdrawal-sign">
            <h1 className="">
              <span className="mr2">REQUEST SENT</span>
              <i className="fa fa-check c-main" />
            </h1>
            <p>The G-loot Compliance Team will handle your withdrawal as soon as possilble.</p>
          </div>
        ) : (
          <div className="flex flex-column items-center justify-center success-sign">
            <i className="fa fa-check c-main" />
            <h1 className="c-main">SUCCESS</h1>
          </div>
        )}
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
        {queryParams.redirectUrl && (
          <div className="flex justify-center mt3">
            <Button onClick={this.navigateBack}>
              {' '}
              <i className="fa fa-home mr1" />
              {`Return to ${this.extractRootDomain(queryParams.redirectUrl)}`}
            </Button>
          </div>
        )}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(SuccessContainer);
