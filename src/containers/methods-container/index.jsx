import * as React from 'react';
import { connect } from 'react-redux';
import { getPaymentMethods } from '../../services/paymentiq-service';

const mapStateToProps = state => ({
  merchantId: state.app.merchantId,
  userId: state.app.userId,
  sessionId: state.app.sessionId,
  locale: state.app.locale,
});

const dispatchToProps = {
};

class MethodsContainer extends React.Component {
  async componentDidMount() {
    const { merchantId, userId, sessionId, locale } = this.props;
    const resp = await getPaymentMethods({ merchantId, userId, sessionId, locale });
  }

  render() {
    return (
      <section>
        GLOOT PAYMENTS
      </section>
    );
  }
}

export default connect(mapStateToProps, dispatchToProps)(MethodsContainer);