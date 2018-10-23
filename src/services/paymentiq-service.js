import * as api from '../utils/api';
import queryParams from '../utils/query-params';

export function getPaymentMethods() {
  const { merchantId, userId, sessionId, locale } = queryParams;
  return api.get(
    `paymentiq/cashier/${merchantId}/${userId}?sessionId=${sessionId}&method=deposit&locale=${locale}`
  );
}
