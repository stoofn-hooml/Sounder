/*
  Login.js

  This provides the implementation for the login component.

*/
import React, { Component } from 'react';
import data from "../../public/sounderUsers.json";

class Login extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      user: null
    }
  };

handleUsername(inputEvent){
  this.setState({username: inputEvent.target.value});
}

render() {
  let usernameInput = (<input type="text" value={this.state.username} onChange={(event)=>{this.handleUsername(event)}}/>);
  let signIn = (<button onClick={()=>this.props.setProfile(this.state.username)}>Sign In</button>);

  return(
    <div>
      <h1>
      Sounder
      </h1>
      <div>
      {usernameInput}
      </div>
      <div>
    {signIn}
      </div>
    </div>
    );

  }
}
export default Login;
