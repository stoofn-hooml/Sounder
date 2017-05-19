/*

MatchLog.js

MatchLog takes in 2 props: matchlist and clickMatch
-matchlist is an array of objects that store the acccount information
of the artists that currentLogin has matched with
-clickMatch is a callback function that updates the state of mode and currentMatch in App.js


*/


import React  from 'react';
import styled from 'styled-components';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
import ListGroup from 'react-bootstrap/lib/ListGroup.js';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js';
import '../index.css';
import Popover from 'react-bootstrap/lib/Popover.js';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger.js';

const CenteredTitle=styled.h2`
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #ff4b00;
  padding-bottom: 10px;
`;

const MatchName = styled(ListGroupItem)`
  color: black;
  font-size: 16px;
  curson: pointer;
  &:hover {
   color: #FF7700;
 }

`;

const MatchNameStyle = styled(Col)`
 cursor: pointer;
  &:hover {
   color: #FF7700;
 }
`
const NameStyle = styled.p`
 cursor: pointer;
 font-weight: bold;
  &:hover {
   color: #FF7700;
 }
 `

const MatchPreview = styled(Popover)`
  width: 400px;

`


function MatchLog(props){
  const matchlog = (props.matchlist).map((user)=>{
    let name = user.username;
    let timeString = props.matchTimes[user.id][0];
    let time;
    if (timeString.length === 11){
        time = timeString;
    } else{
      time = '';

    }

    const popoverHoverFocus = (
    <MatchPreview id="popover-trigger-hover-focus" title={name}  positionLeft={200}
      positionTop={50}>
      <p><strong>Genre</strong> {user.genre.replace(/,/g, ", ")}</p>
      <p><strong>Followers</strong> {user.numFollowers}</p>
      <p><strong>Matched</strong> {time}</p>
    </MatchPreview>
  );
    return (
        <MatchName key={name} value={name} onClick={()=>{props.clickMatch(user)}}>
          <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus} arrowOffsetLeft='40px'>
            <MatchNameStyle lg={12}> <NameStyle>{name}</NameStyle></MatchNameStyle>
          </OverlayTrigger>
        </MatchName>
    );
  });

  return (
    <Grid fluid={true}>
      <Row>
        <Col lg={12} md={12} sm={12} ><CenteredTitle>Matches</CenteredTitle></Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} >
          <ListGroup>{matchlog}</ListGroup>
        </Col>
      </Row>
    </Grid>
  );
};

export default MatchLog;
