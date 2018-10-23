
import ActionCreator from '../action-creator';
import queryParams from '../../utils/query-params';

export const ActionCreators = {
  setLoading: new ActionCreator('SET_LOADING'),
};

export const initialState = {
  queryParams, // this is 'immutable', only here for convenience
};

export default function reducer(state = initialState, action) {
  let partialState;

  if (action.type === ActionCreators.setLoading.type) {
    partialState = { loading: action.payload };
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
