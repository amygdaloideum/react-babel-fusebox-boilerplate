import * as api from '../utils/api';
import queryParams from '../utils/query-params';

const defaultParams = {
  sessionId: queryParams.sessionId,
  userId: queryParams.userId,
  merchantId: queryParams.merchantId,
  amount: 3.00 //Math.abs(queryParams.attributes.glootAmount.amount),
}

const redirectUrlOverride = {
  failureUrl: process.env.FAILURE_REDIRECT_URL + "?userid=${ptx.merchantUserId}&merchantid=${ptx.merchantId}&amount=123.00&sessionid=494ac3d74cf5a2cffa30c8eefcfeda4b614d71ba&locale=en_US&showconfirmation=false&redirecttarget=self&platform=pc&email=glootone@gloot.com&txtype=withdrawal&txId=${ptx.id}",
  successUrl: process.env.SUCCESS_REDIRECT_URL + "?userid=${ptx.merchantUserId}&merchantid=${ptx.merchantId}&amount=123.00&sessionid=494ac3d74cf5a2cffa30c8eefcfeda4b614d71ba&locale=en_US&showconfirmation=false&redirecttarget=self&platform=pc&email=glootone@gloot.com&txtype=withdrawal&txId=${ptx.id}",
};

export function getPaymentMethods() {
  const { merchantId, userId, sessionId, locale } = queryParams;
  return api.get(
    `paymentiq/cashier/${merchantId}/${userId}?sessionId=${sessionId}&method=deposit&locale=${locale}`
  );
}

export function startPaymentProcess({ txMethod, txType = queryParams.txType, body }) {
  return api.post(`paymentiq/${txMethod}/${txType}/process`, {
    ...defaultParams,
    ...body,
    attributes: {
      ...queryParams.attributes,
      ...redirectUrlOverride,
    }
  });
}

export async function getPublicKey() {
  const key = await fetch(`/api/paymentiq/viq/getvaultiqpublickey/${queryParams.merchantId}`);
  const text = await key.text();
  return text;
}

export function getTxStatus({ txId }) {
  return api.get(`user/transaction/${defaultParams.merchantId}/${defaultParams.userId}/${txId}/status?sessionId=${defaultParams.sessionId}`);
}
