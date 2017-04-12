/*
  Login.js

  This provides the implementation for the login component.

  Login maintains state in the form of username.

  Login has one prop: setProfile. setProfile is a callback function that updates the state in App.js of currentUser to be the username and the mode to be the home page.

*/
import React, { Component } from 'react';


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
