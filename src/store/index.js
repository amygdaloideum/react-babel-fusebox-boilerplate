import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

import appReducer from './app/reducer';
import networkReducer from './network/reducer';
import modalReducer from './modal/reducer';
import paymentReducer from './payment/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  network: networkReducer,
  modal: modalReducer,
  payment: paymentReducer,
});

// rehydrating state on app start: implement here...
const recoverState = () => ({});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export let store;
const createAppStore = () => createStore(rootReducer, recoverState(), composeEnhancers());

if (process.env.NODE_ENV === 'dev') {
  store = window.store = window.store || createAppStore(); // for persisting store through hmr in dev
} else {
  store = createAppStore();
}
