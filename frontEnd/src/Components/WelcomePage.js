import React from 'react';

import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
//import Button from 'react-bootstrap/lib/Button.js';
import '../index.css';

function WelcomePage(props) {

  return (
    <Grid>
      <Row bsClass="topRow">
        <Col lg={12} md={9} sm={5}>
          <button onClick={()=>props.setMode('home')} >Welcome!</button>
        </Col>
      </Row>
    </Grid>

  )

}

export default WelcomePage;
