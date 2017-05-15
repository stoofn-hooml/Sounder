import React, { Component } from 'react';
//import styled from 'styled-components';

// const WelcomeText = styled.p`
//   font-size: 18px;
// `;

function WelcomePage(){

  const welcomeText = (<h2>Hi! Welcome to Sounder!</h2>);

  return(
    <div>
    {welcomeText}
    </div>
  );
}

export default WelcomePage;
