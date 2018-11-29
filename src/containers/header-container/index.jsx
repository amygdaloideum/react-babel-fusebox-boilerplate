import * as React from 'react';
import { connect } from 'react-redux';
import queryParams from '../../utils/query-params';
import { formatCurrency } from '../../utils/currency';
import './header.sass';

export default class Header extends React.Component {
  render() {
    const {
      txType,
      attributes: { glootType, glootAmount },
    } = queryParams;
    return (
      <section className="payments-header">
        <div className="title-container">
          <img src="/assets/img/vault-icon.svg" />
          <div className="flex flex-column">
            <h3 className="tx-type">{glootType || txType}</h3>
          </div>
        </div>
        <table className="summary-table">
          <tbody>
            <tr>
              <td>amount:</td>
              <td>
                {formatCurrency({ amount: glootAmount.amount, currency: glootAmount.currency })}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
