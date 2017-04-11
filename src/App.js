/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  It displays the title of the application. All of the real work is handled by the ContentArea component.
  */

import React, { Component } from 'react';
import styled from 'styled-components';

import MatchPage from './MatchingPage/MatchPage.js';
import Profile from './profile/profile.js';
import data from '../public/sounderUsers.json';


const CenteredTitle=styled.h1`
  text-align: center;
`;


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode: 'home'


    }
  }
  render() {
    if(this.state.mode =='home'){
      return (
        <div className="App">
          <Profile setMode={(article)=>this.setState({mode:'matching'})}/>

        </div>
      );
    } else {
      return (
        <div className="App">
          <MatchPage setMode={(article)=>this.setState({mode:'home'})} />
        </div>
      );
    }


  }
}

export default App;
