import React, { Component } from 'react';
import styled from 'styled-components';

const WelcomeText = styled.p`
  font-size: 18px;
`;

function WelcomePage(){

  const welcomeText = (<WelcomeText>Hi! Welcome to Sounder!</WelcomeText>);

  return(
    <div>
    {welcomeText}
    </div>
  );
}

export default WelcomePage;
