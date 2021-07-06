import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// import components

import NavBar from '../../components/NavBar';

const App = () => {

  return (
    <>
    <NavBar />
        <Switch>
          <div>hello world</div>
        </Switch>
  </>
  )
}

export default App;
