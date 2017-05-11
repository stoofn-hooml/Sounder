const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const server = http.createServer(app);
//bodyparser for passing JSON around without having to parse each time
var bodyParser = require('body-parser');
// for encryption
var crypto = require('crypto');

// Required for passport authentication local strategy
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


passport.use(new Strategy(
  function(username, password, done) {
    knex.select().from('users').where('username', username).then((response)=>{
      if (response.length === 0) {
        console.log("Incorrect username")
      }
      else if (response[0].password === password){
        console.log("Password success");
        return done(null, response);
      }
    })
  }
));

// /****** Passport functions ******/
// passport.serializeUser(function (user, done) {
//     console.log('serialized');
//     done(null, user.id);
// });
//
// passport.deserializeUser(function (id, done) {
//     console.log("start of deserialize");
//     knex.select().from('users').where('id', id).then((response)=>{
//       if (response.length === 0) {
//         console.log("unable to deserialize user")
//       }
//       else {
//         console.log("Deserialized user");
//         return done(null, response);
//       }
//     })
//   });

passport.serializeUser(function(user, done) {
  console.log("User serialized")
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(express.static(__dirname + '/build'));


//+-------------------Passport Stuff------------------------+

//THIS WORKED
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.

app.use(passport.initialize());
app.use(passport.session());

var engine = require('consolidate');
app.set('views', __dirname + '/build/');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

var path = require('path');

// Define routes.
app.get('/login', function(req, res){
    //res.sendFile(path.join(__dirname + '/build/login.html'));
    res.render('login.html')
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), function(req, res) {
    let userID = req.user[0]['id'];
    res.redirect('index.html');
});

app.get('/api/user_data', function(req, res) {
    console.log('Trying to request session user ' + req.session.passport.user[0].username);
    if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    } else {
          console.log("Success, session found!")
          res.send(req.user[0]);
    }
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

//+-------------------Database Routes------------------------+

app.get('/sounder/users/', (request,response) =>{
  knex('users').select().then((data)=>{
      response.send(data);
    });
  });

// For getting specific user data
app.get('/sounder/users/:id', (request, response) =>{
  const userID = parseInt(request.params.id);
    knex.select().from('users').where('id', userID).then((values)=>{
      response.send(values);
    });
});

//adds user to db
app.post('/sounder/users', (request, response) => {
  knex('users').insert(request.body).then((values)=>{
    response.send(values);
  });
});


// Adds an updated user by deleting the old one and adding new
app.put('/sounder/users/:id', (request, response) =>{
  const userID = parseInt(request.params.id);
  const min = parseInt(request.body.followerRangeMin);
  const max = parseInt(request.body.followerRangeMax);

  let updatedUserObj = request.body

  knex('users').where('id', userID).update({
    followerRangeMin:min,
    followerRangeMax:max,
    genre: request.body.genre,
    song1: request.body.song1,
    song2: request.body.song2,
    song3: request.body.song3,
    profileURL: request.body.profleURL,
    thumbsUpTotal: request.body.thumbsUpTotal,
    totalRatings: request.body.totalRatings
  }).then((status)=>{
    response.sendStatus(status);
  });
});

// For handling requests to "likes" table
app.get('/sounder/likes', (request, response) =>{
  knex('likes').select().then((data)=>{
    response.send(data);
  });
});

// For adding a new "like" to the database
app.post('/sounder/likes', (request, response) =>{
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

// For adding a new "match" to the database
app.post('/sounder/matches', (request, response) =>{
  knex('matches').insert(request.body).then((values)=>{
    response.send(values);
  });
});

// For getting specific matches based on id
app.get('/sounder/matches/:id', (request, response)=>{
  const userID = parseInt(request.params.id);
    knex.select().from('matches').where('user_id', userID).orWhere('matched_id', userID).then((matches)=>{
      response.send(matches);
    });
});


server.listen(port);
console.log("Listening on port %d", server.address().port);
