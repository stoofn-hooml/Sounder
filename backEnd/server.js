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
app.use(express.static(__dirname + '/site'));
app.use(bodyParser.json());





/*Passport Stuff*/




passport.use(new Strategy(
  function(username, password, done) {
    knex.select().from('users').where('username', username).then((response)=>{
      if (response.length === 0) {
      console.log("Incorrect username or password");
      return done(null, false);
      }
      else if (response[0].password === password){
       //alert("Incorrect username or password")
        console.log("Password success");
        return done(null, response);
      }
      else{
        return done(null, false);
      }
    })
  }
));


passport.serializeUser(function(user, done) {
  console.log("User serialized")
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(express.static(__dirname + '/build'));

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
    res.render('login.html')
});

app.get('/signup', function(req, res){
    res.render('signup.html')
});



app.post('/login', passport.authenticate('local', {  failureRedirect: '/signup'}), function(req, res) {
    console.log("")
    let userID = req.user[0]['id'];
    res.redirect('index.html');
});



app.post('/signup', function(req, res) {
    let userObj = req.body;
    if (userObj.song1.search("w.soundcloud.com/player/") == -1 ||
     userObj.song1.search("tracks") == -1){ //Checks if the song is a valid code and not a playlist
        res.render('signup.html');
    }
    else if (userObj.song2.search("w.soundcloud.com/player/") == -1 ||
        userObj.song2.search("tracks") == -1){ //Checks if the song is a valid code and not a playlist
        res.render('signup.html');
    }
    else if (userObj.song3.search("w.soundcloud.com/player/") == -1 ||
         userObj.song3.search("tracks") == -1){ //Checks if the song is a valid code and not a playlist
         res.render('signup.html');
    }
    else if (userObj.profilePictureURL.search(".jpg") == -1 && userObj.profilePictureURL.search(".png") == -1){ //Image URL should end in .jpg or .png
        res.render('signup.html');
    }
    else if(isNaN(userObj.numFollowers)){ //numFollowers should be a number
        res.render('signup.html');
    }
    else if(req.body.password !== req.body.password2) { //checks that password/confirm password match
      res.render('signup.html');
    }

    else {
      delete req.body.password2
      let userObj = Object.assign({}, req.body, {genre:req.body.genre.toString()});
      knex.select().from('users').where('username', userObj.username).then((response)=>{
        /*check to make sure that the username does not already exist*/
        if (response.length === 0) {
          console.log("new user!");
          knex('users').insert(userObj).then(()=>{
            res.render('login.html')
          });
        }
        else {
          res.render('signup.html')
        }

    })
  }


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

app.get('/logout',
  function(req, res){
    console.log("trying to log out!");
    req.logout();
    res.redirect('/login');
  });





// For getting general user data
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
  console.log(request.body);
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
  }).then(()=>{
    response.sendStatus(200);
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
  console.log(request.body)
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

app.get('/sounder/matches:id', (request, response) =>{
  const userID = parseInt(request.params.user_id);
  const matchedID = parseInt(request.params.matched_id);
    knex.select().from('matches').where('user_id', userID).andWhere('matched_id', matched_ID).then((match)=>{
      response.send(match);
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

app.put('/sounder/matches/:id', (request, response)=>{
  let ratingToChange = request.body.ratingToChange;
  let body = request.body.matchObject;
  let userID = parseInt(request.params.id);
  if (ratingToChange === 1){    // user_id is the logged in user
    knex('matches').where('user_id', body.user_id).andWhere('matched_id', userID).update({user_id_rating: body.user_id_rating})
    .then(()=>{
      response.sendStatus(200);
    })
  }else{
    knex('matches').where('user_id', userID).andWhere('matched_id', body.matched_id).update({matched_id_rating: body.matched_id_rating})
    .then(()=>{
      response.sendStatus(200);
    })
  }
});


server.listen(port);
console.log("Listening on port %d", server.address().port);
