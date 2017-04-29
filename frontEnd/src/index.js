// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.js';
// import './index.css';
//
// // ReactDOM.render(
// //   <App/>,
// //
// //   document.getElementById('root')
// // );


// import React, { Component } from 'react';
// import { render } from 'react-dom';
// // Import routing components
// import {Router, Route} from 'react-router';
// //import { BrowserRouter, Route } from 'react-router';
// // Import custom components


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {render} from 'react-dom';


import App from './App.js';
import LoginPage from './Components/LoginRoute.js';
import NotFound from './Components/NotFound.js';

render(
    <BrowserRouter>
        <div>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/error" component={NotFound}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
