import appRouter from '../frontEnd/index.jsx'


const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const server = http.createServer(app);

//bodyparser for passing JSON around without having to parse each time
var bodyParser = require('body-parser');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./sounderUsers.db"
  }
});

const users = knex('users');
const followers = knex('followers');
const matches = knex('matches');
const likes = knex('likes');

const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type']
};

var port = 4321;



const routes = createRoutes(appRouter());

const router = express.Router();

// var path = require('path');
// var viewPath = path.join(__dirname, 'app/views');
//
// app.set('views', viewPath);
//
// //var router = express.Router();
//
// app.get('/home',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });


// // serve static assets normally
// app.use(express.static(__dirname + '/public'))
// const path = require("path")
// // Handles all routes so you do not get a not found error
// app.get('*', function (request, response){
//     console.log("trying to get some path")
//     response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })
//
//
//







app.use(cors(corsOptions));
app.use(express.static(__dirname + '/site'));
app.use(bodyParser.json());






require('babel-register');
var path = require('path');
var favicon = require('serve-favicon');



const routes = createRoutes(appRouter());

const router = express.Router();







app.get('/sounder/users/', (request,response) =>{
  console.log("hi! yay its working!!!");
  users.select().then((data)=>{
      response.send(data);
    });
  });

app.post('/sounder/users', (request, response) => {
  console.log("trying to add new user!");
  console.log(request.body);
  knex('users').insert(request.body).then((values)=>{
    response.send(values);
  });
  })

app.get('/sounder/users/:id', (request, response) =>{
  const userID = parseInt(request.params.id);
  users.select().then((data)=>{
    knex.select().from('users').where('id', userID).then((values)=>{
      response.send(values);
    });
  });
});

// For handling requests to "likes" table
app.get('/sounder/likes', (request, response) =>{
  likes.select().then((data)=>{
    response.send(data);
  });
});

app.post('/sounder/likes', (request, response) =>{
  console.log(request.body)
  knex('likes').insert(request.body).then((values)=>{
    response.send(values);
  });
});

// For handling requests to "matches" table
app.get('/sounder/matches', (request, response) =>{
  matches.select().then((data)=>{
    response.send(data);
  });
});

app.post('/sounder/matches', (request, response) =>{
  console.log(request.body)
  knex('matches').insert(request.body).then((values)=>{
    response.send(values);
  });
});



server.listen(port);
console.log("Listening on port %d", server.address().port);
