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

const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type']
};

var port = 4321;

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/site'));


app.use(bodyParser.json());






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



server.listen(port);
console.log("Listening on port %d", server.address().port);
