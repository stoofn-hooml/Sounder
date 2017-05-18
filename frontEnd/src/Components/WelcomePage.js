import React from 'react';
import styled from 'styled-components';
import Image from 'react-bootstrap/lib/Image.js';
import sounderLogo from './sounder.png'
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';

const Title = styled.p`
  margin-top: 20px;
  font-size: 60px;
  font-weight:bold;
  margin-left: 20px;
`;


const WelcomeText = styled.p`
  margin-top: 10px;
  font-size: 36px;
  margin-left: 20px;
`;

const HeadlineText = styled.p`
  margin-top: 20px;
  font-size: 24px
  margin-left: 20px;
`;




function WelcomePage(){

  let title = (<Title> Sounder </Title>)
  let sounderIcon = (<Image src={sounderLogo}   width="550px" height="550px"/>);
  let welcomeText = (<WelcomeText> A networking platform for like-minded SoundCloud artists. </WelcomeText>);
  let headlineOne =(<HeadlineText> Organically grow your follower base. </HeadlineText>);

  let headlineTwo= (<HeadlineText> Connect with SoundCloud artists from around the world. </HeadlineText>);
  let headlineThree= (<HeadlineText> Find new music in your favorite genre. </HeadlineText>);

return(

  <div>
    <div>
    <Grid>
    <Row>
      <Col lg={6} md={6} >
    {sounderIcon}
      </Col>
      <Col lg={6} md={6} >
      <Row>
      {title}
      </Row>
      <Row>
      {welcomeText}
      </Row>
      <Row>
      {headlineOne}
      </Row>
      <Row>
      {headlineTwo}
      </Row>
      <Row>
      {headlineThree}
      </Row>
      </Col>

    </Row>
    </Grid>
    </div>
    </div>
  );
}

export default WelcomePage;
