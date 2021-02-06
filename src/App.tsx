import React, { lazy, Suspense } from 'react';
import {Provider} from 'react-redux';
import {configureStore} from './Store';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
//import { AskPage } from './AskPage';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { HeaderWithRouter as Header } from './Header';
import  HomePage  from './HomePage';
//import { NotFoundPage } from './NotFoundPage';
import { gray2, fontSize, fontFamily } from './Styles';
import { QuestionPage } from './QuestionPage';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NotFoundPage } from './NotFoundPage';
//  318s test functional and commit changes
/*function App() {
  debugger;
  return (
    <div className="App">
      <Header />
      <HomePage />
    </div>
  );
}*/
const App: React.FC = () => {
  const AskPage = lazy(() => import('./AskPage'));
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}
      >
        <Header />
        <switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/ask">
            <Suspense
              fallback={
                <div
                  css={css`
                    margin-top: 10px;
                    text-align: center;
                  `}
                >
                  Loading...
                </div>
              }
            >
              <AskPage />
            </Suspense>
          </Route>
          <Route path="/signin" component={SignInPage} />
          <Route path="/login" component={SignInPage} />
          <Route path="/questions/:questionId" component={QuestionPage} />
          <Route component={NotFoundPage} />
        </switch>
      </div>
    </BrowserRouter>
    </Provider>
  );
};

const store = configureStore();


export default App;
