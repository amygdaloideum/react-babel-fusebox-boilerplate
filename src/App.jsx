import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import './styles/main.sass';

import { store } from './store';
import MethodsContainer from './containers/methods-container';
import MethodContainer from './containers/method-container';
import SuccessContainer from './containers/success-container';
import Header from './containers/header-container';
import ErrorModal from './components/error-modal';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="background-wrapper">
          <div id="stars" />
          <div id="stars2" />
        </div>
        <Provider store={store}>
          <div className="content-wrapper">
            <div className="main-container">
              <div className="content">
                <Header />
                <BrowserRouter>
                  <Switch location={location}>
                    <Route exact path="/" component={MethodsContainer} />
                    <Route exact path="/method/:txType" component={MethodContainer} />
                    <Route exact path="/success" component={SuccessContainer} />
                  </Switch>
                </BrowserRouter>
              </div>
              <div className="footer">
                <a target="_blank" href="https://www.gloot.com/privacy-policy/">PRIVACY</a>
                <a target="_blank" href="https://www.gloot.com/terms-conditions/">TERMS & CONDITIONS</a>
                <a target="_blank" href="https://www.gloot.com/contact/">HELP</a>
              </div>
              <ErrorModal />
            </div>
          </div>
        </Provider>
      </div>
    );
  }
}
