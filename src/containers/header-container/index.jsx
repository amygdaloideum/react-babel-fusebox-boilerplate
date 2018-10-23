import * as React from 'react';
import { connect } from 'react-redux';
import { getPaymentMethods, test } from '../../services/paymentiq-service';
import { ActionCreators as paymentActionCreators } from '../../store/payment/reducer';
import './header.sass';

const mapStateToProps = state => ({
  txType: state.app.queryParams.txType,
});

const dispatchToProps = {
};

class Header extends React.Component {
  render() {
    const { txType } = this.props;
    return (
      <section className="payments-header">
        <img src="/assets/img/gloot-icon.svg" />
        <h1>G-LOOT PAYMENTS</h1>
        <h3 className="tx-type">{ txType }</h3>
      </section>
    );
  }
}

export default connect(mapStateToProps, dispatchToProps)(Header);