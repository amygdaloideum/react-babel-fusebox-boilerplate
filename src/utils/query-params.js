import queryString from 'query-string';
const search = queryString.parse(location.search)

const queryParams = {
  userId: search.userid,
  merchantId: search.merchantid,
  amount: search.amount,
  sessionId: search.sessionid,
  locale: search.locale,
  showConfirmation: search.showconfirmation,
  redirectTarget: search.redirecttarget,
  platform: search.platform,
  email: search.email,
  txType: search.txtype,
  txId: search.txId,
  attributes: search.attributes ? JSON.parse(search.attributes) : {},
};

export default queryParams;