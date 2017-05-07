import React, { Component } from 'react';

class LoginPage2 extends Component{
  constructors(){
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

const SERVER = 'http://localhost:4321';

login(){
  let loginData = {}
  loginData.username = this.state.username;
  loginData.password = this.state.password;
  const loginStr = JSON.stringify(loginData);
  const request = new Request(
    SERVER + "/login",
    {
      method: 'POST',
      body: loginStr,
      headers: new Headers({'Content-type': 'application/json'})
    }
  );

  fetch(request)
  .then((response)=>{
    if (response.ok){
      return response.json();
    }
  });
}

  handleUsername(inputEvent){
    this.setState({username: inputEvent.target.value});
  }

  handlePassword(inputEvent){
    this.setState({password: inputEvent.target.value});
  }

  render() {
    let usernameInput = (<input  placeholder="Username" type="text" value={this.state.username} onChange={(event)=>{this.handleUsername(event)}}/>);
    let passwordInput = (<input  placeholder="Password" type="text" value={this.state.password} onChange={(event)=>{this.handlePassword(event)}}/>);
    let signIn = (<button onClick={()=>this.login()}>Sign In</button>);
  }
}

export default LoginPage2;
