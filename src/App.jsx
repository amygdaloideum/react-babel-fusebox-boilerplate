import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import './styles/main.sass';

import { store } from './store';
import MethodsContainer from './containers/methods-container';
import ErrorModal from './components/error-modal';

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Switch location={location}>
              <Route exact path="/" component={MethodsContainer} />
            </Switch>
          </BrowserRouter>
          <ErrorModal />
        </div>
      </Provider>
    );
  }
}
