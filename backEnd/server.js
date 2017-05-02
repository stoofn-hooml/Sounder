const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const server = http.createServer(app);
//bodyparser for passing JSON around without having to parse each time
var bodyParser = require('body-parser');


var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./sounderUsers.db"
  }
});

const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type']
};

var port = 4321;

app.use(cors(corsOptions));
app.use(bodyParser.json());




app.use(express.static(__dirname + '/build'));



//+-------------------Passport Stuff------------------------+



// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());




// var engine = require('consolidate');
// app.set('views', __dirname + '/build/static');
// app.engine('html', engine.mustache);
// app.set('view engine', 'html');


 var path = require('path');



// Define routes.
app.get('/',
  //require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    res.render('login.html', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.sendFile(path.join(__dirname + '/build/login.html'));
});


app.post('/login',
//  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});


app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });







//+-------------------Passport Stuff, Above------------------------+
































app.get('/sounder/users/', (request,response) =>{
  console.log("hi! yay its working!!!");
  knex('users').select().then((data)=>{
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
    knex.select().from('users').where('id', userID).then((values)=>{
      response.send(values);
    });
});

// For handling requests to "likes" table
app.get('/sounder/likes', (request, response) =>{
  knex('likes').select().then((data)=>{
    response.send(data);
  });
});

app.post('/sounder/likes', (request, response) =>{
  //console.log(request.body)
  knex('likes').insert(request.body).then((values)=>{
    response.send(values);
  });
});

// For handling requests to "matches" table
app.get('/sounder/matches', (request, response) =>{
  knex('matches').select().then((data)=>{
    response.send(data);
  });
});

app.post('/sounder/matches', (request, response) =>{
  //console.log(request.body)
  knex('matches').insert(request.body).then((values)=>{
    response.send(values);
  });
});

app.get('/sounder/matches/:id', (request, response)=>{
  const userID = parseInt(request.params.id);
    knex.select().from('matches').where('user_id', userID).orWhere('matched_id', userID).then((matches)=>{
      response.send(matches);
    });
});


server.listen(port);
console.log("Listening on port %d", server.address().port);
