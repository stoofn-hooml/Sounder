/*
  Login.js

  This provides the implementation for the login component.

  Login maintains state in the form of username.

  Login has one prop: setProfile. setProfile is a callback function that updates the state in App.js of currentUser to be the username and the mode to be the home page.

*/
import React, { Component } from 'react';
import styled from 'styled-components';

const LoginPage = styled.div`
  text-align: center;
  margin-top: 100px;
  height: 50%;
`;

const UsernameInput = styled.div`
  background-color: #FF7700; /* orange  */
  position: relative;
  padding: 10px;
  font-size: 16px;
  height:50;
  width: 300px;
  display: inline-block;
`;



const LoginButton = styled.div`
  background-color: #525252; /* Green */
  border: none;
  color: white;
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  border-radius: 28px;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
   background-color:#FF7700;
 }

`;

const SounderHeader = styled.div`
  font-size: 3.0em;
  font-weight: bold;
  font-variant: small-caps;
  color:#525252;
`;

const Input = styled.input`
  width:200px;
  height:25px;

`;

class Login extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
    }
  };



handleUsername(inputEvent){
  this.setState({username: inputEvent.target.value});
}

render() {
  let usernameInput = (<Input  type="text" value={this.state.username} onChange={(event)=>{this.handleUsername(event)}}/>);
  let signIn = (<LoginButton onClick={()=>this.props.setProfile(this.state.username)}>Sign In</LoginButton>);

  return(
    <LoginPage>
      <SounderHeader>
      Sounder
      </SounderHeader>
      <UsernameInput>
      {usernameInput}
      </UsernameInput>
      <div>
    {signIn}
      </div>
    </LoginPage>
    );

  }
}
export default Login;
