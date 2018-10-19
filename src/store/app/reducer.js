import queryString from 'query-string';
import ActionCreator from '../action-creator';

export const ActionCreators = {
  setLoading: new ActionCreator('SET_LOADING'),
};

const queryParams = queryString.parse(location.search)

export const initialState = {
  userId: queryParams.userid,
  merchantId: queryParams.merchantid,
  amount: queryParams.amount,
  sessionId: queryParams.sessionid,
  locale: queryParams.locale,
  showConfirmation: queryParams.showconfirmation,
  redirectTarget: queryParams.redirecttarget,
  platform: queryParams.platform,
  email: queryParams.email,
  txType: queryParams.txtype,
};

export default function reducer(state = initialState, action) {
  let partialState;

  if (action.type === ActionCreators.setLoading.type) {
    partialState = { loading: action.payload };
  }

  return partialState != null ? { ...state, ...partialState } : state;
}