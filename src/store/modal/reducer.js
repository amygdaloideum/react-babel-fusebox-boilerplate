import ActionCreator from '../action-creator';

export const ActionCreators = {
  openModal: new ActionCreator('OPEN_MODAL'),
  closeModal: new ActionCreator('CLOSE_MODAL'),
};

export const modalNames = {
  errorModal: 'errorModal',
};

export const initialState = {
  isOpen: false,
  name: '',
};

export default function reducer(state = initialState, action) {
  let partialState;

  if (action.type === ActionCreators.openModal.type) {
    if (action.payload && modalNames[action.payload]) {
      partialState = { isOpen: true, name: action.payload };
    }
  }

  if (action.type === ActionCreators.closeModal.type) {
    partialState = { isOpen: false, name: '' };
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
