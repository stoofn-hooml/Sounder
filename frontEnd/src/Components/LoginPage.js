/*
  LoginPage.js

  This provides the implementation for the login component.

  LoginPage maintains state in the form of username.

  LoginPage has one prop: setProfile. setProfile is a callback function that updates the state in App.js of currentUser to be the username and the mode to be the home page.

*/
import React, { Component } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/lib/Form.js';
import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import ControlLabel from 'react-bootstrap/lib/ControlLabel.js';
import Checkbox from 'react-bootstrap/lib/Checkbox.js';


import Col from 'react-bootstrap/lib/Col.js';
import Button from 'react-bootstrap/lib/Button.js';





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
      mode: 'login',
      username: '',
      password: ''
    }
  };



handleUsername(inputEvent){
  this.setState({username: inputEvent.target.value});
}

handlePassword(inputEvent){
  this.setState({password: inputEvent.target.value});
}

render() {
  // let usernameInput = (<Input  type="text" value={this.state.username} onChange={(event)=>{this.handleUsername(event)}}/>);
  // let passwordInput = (<Input  type="text" value={this.state.password} onChange={(event)=>{this.handlePassword(event)}}/>);
  // let signIn = (<LoginButton onClick={()=>this.props.setProfile(this.state.username)}>Sign In</LoginButton>);
  // let createAccount = (<LoginButton onClick={()=>this.setState({mode:'signUp'})}>Create Account</LoginButton>);
  // let signUp = (<LoginButton onClick={()=>this.props.newUser(this.state.username,this.state.password)}>Sign Up</LoginButton>);
  // let cancel = (<LoginButton onClick={()=>this.setState({mode:'login'})} >Cancel</LoginButton>);


  let usernameInput = (<Input  placeholder="Username" type="text" value={this.state.username} onChange={(event)=>{this.handleUsername(event)}}/>);
  let passwordInput = (<Input  placeholder="Password" type="text" value={this.state.password} onChange={(event)=>{this.handlePassword(event)}}/>);
  let signIn = (<LoginButton onClick={()=>this.props.setProfile(this.state.username)}>Sign In</LoginButton>);
  let createAccount = (<LoginButton onClick={()=>{this.props.switchToSignUp(); console.log("go to signup!!")}}>Create Account</LoginButton>);






  if (this.state.mode == 'login'){
    return(
      <LoginPage>
        <SounderHeader>
        Sounder
        </SounderHeader>
        <UsernameInput>
          {usernameInput}
        </UsernameInput>
        <div>
          <UsernameInput>
            {passwordInput}
          </UsernameInput>
        </div>
        <div>
          {signIn}
          {createAccount}
        </div>
        </LoginPage>

      );
  }

  if (this.state.mode == 'signUp'){
    return(
      <LoginPage>
        <SounderHeader>
        Sounder
        </SounderHeader>
        <UsernameInput>
          {usernameInput}
        </UsernameInput>
        <div>
          <UsernameInput>
            {passwordInput}
          </UsernameInput>
        </div>
        <div>
        {signIn}
        {createAccount}
        </div>
        </LoginPage>

      );
  }
}
}
export default Login;
