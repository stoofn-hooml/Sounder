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

const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type']
};

var port = 4321;

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/site'));
app.use(bodyParser.json());

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
