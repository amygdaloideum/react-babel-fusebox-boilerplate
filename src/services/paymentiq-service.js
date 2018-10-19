import * as api from '../utils/api';

export function getPaymentMethods({ merchantId, userId, sessionId, locale }) {
  return api.get(
    `paymentiq/cashier/${merchantId}/${userId}?sessionId=${sessionId}&method=deposit&locale=${locale}`
  );
}
