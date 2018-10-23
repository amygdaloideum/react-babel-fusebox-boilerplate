import ActionCreator from '../action-creator';

export const ActionCreators = {
  setMethods: new ActionCreator('SET_METHODS'),
  setSelectedMethod: new ActionCreator('SET_SELECTED_METHOD'),
};

export const initialState = {
  methods: [],
  selectedMethod: null,
}

export default function reducer(state = initialState, action) {
  let partialState;

  if (action.type === ActionCreators.setMethods.type) {
    partialState = { methods: action.payload };
  }

  if (action.type === ActionCreators.setSelectedMethod.type) {
    partialState = { selectedMethod: action.payload };
  }

  return partialState != null ? { ...state, ...partialState } : state;
}