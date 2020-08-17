import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AskPage } from './AskPage';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { Header } from './Header';
import { HomePage } from './HomePage';
//import { NotFoundPage } from './NotFoundPage';
import { gray2, fontSize, fontFamily } from './Styles';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NotFoundPage } from './NotFoundPage';
//  196
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
  return (
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
          <Route path="/ask" component={AskPage} />
          <Route path="/signin" component={SignInPage} />
          <Route component={NotFoundPage} />
        </switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
