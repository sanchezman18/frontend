import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { gray2, fontSize, fontFamily } from './Styles';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

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
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
    >
      <Header />
      <HomePage />
    </div>
  );
};

export default App;
