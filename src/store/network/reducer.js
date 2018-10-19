import ActionCreator from '../action-creator';

export const ActionCreators = {
  addPendingRequest: new ActionCreator('ADD_PENDING_REQUEST'),
  removePendingRequest: new ActionCreator('REMOVE_PENDING_REQUEST'),
  addError: new ActionCreator('ADD_ERROR'),
  clearErrors: new ActionCreator('CLEAR_ERRORS'),
};

export const initialState = {
  pendingRequests: [],
  errors: [],
};

export default function reducer(state = initialState, action) {
  let partialState;

  if (action.type === ActionCreators.addPendingRequest.type) {
    const { id, request } = action.payload;
    partialState = { pendingRequests: [...state.pendingRequests, { id, request }] };
  }

  if (action.type === ActionCreators.removePendingRequest.type) {
    partialState = { pendingRequests: state.pendingRequests.filter(pr => pr.id !== action.payload) };
  }

  if (action.type === ActionCreators.addError.type) {
    partialState = { errors: [...state.errors, action.payload] };
  }

  if (action.type === ActionCreators.clearErrors.type) {
    partialState = { errors: [] };
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
