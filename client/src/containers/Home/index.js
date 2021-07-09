import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import {Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const Home = (props) => {

  return (
    <>
    {console.log('currentUser', props.user)}
    {props.user ? <div>Hello world</div> : <div>Where is User</div>}
    <div>What is happening please</div>
    <div>Tell me now!</div>
    </>
  )
};

export default Home;
