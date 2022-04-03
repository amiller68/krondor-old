const express = require("express");
console.log("Node Version: ", process.version);
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const fs = require('fs');
const bodyParser = require('body-parser')
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const {MongoClient} = require('mongodb');
var client = undefined;

//This should exist on your local environment in order to work properly
const mongoUriFile = 'mongodb.uri'

//URI string used to access Mongo DB
var mongo_uri = 'No URI Loaded';

async function mongoQuery(client, db, collection, method, data=undefined, callback) {
  console.log("Making Query to: <", db, ">:<", collection, ">:<",method,">:",data);
  let result = undefined;
  try {
    await client.connect();

    //Get project
    if(method === 'GET') {
      console.log("Retrieving Data");
      //Send the results to an array
      result = await client.db(db).collection(collection).find().toArray()
    }

    //Check if there's data to send before calling these
    else if (data) {
      //Add a project
      if (method === 'POST') {
        console.log("Posting Data");
        result = client.db(db).collection(collection).insertOne(data)
      }
      //Update a project
      else if (method === 'PUT') {
        console.log("Updating Data");
        result = client.db(db).collection(collection).updateOne({_id: data._id},{$set: data})
      }
      //Update a delete
      else if (method === 'DELETE') {
        console.log("Deleting Data");
        result = client.db(db).collection(collection).deleteOne({_id: data._id});
      }
    }

    else {
      console.log("[ERROR] Could not route DB request");
    }
  } catch (err) {
    console.error(err)
  } finally {
    await client.close
  }
  // console.log("Result: ", result)
  callback(result);
}

const app = express();

// Get our server's path
const path = require('path');
const dir = path.join(__dirname, 'dist/krondor/');

function tokenLog(req, res, next) {
  console.log("Token log:");
  console.log(req.headers.authorization);
  next();
}

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-7--1a-5y.us.auth0.com/.well-known/jwks.json'
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ['RS256']
});

const projectWriteCheck = jwtAuthz(['write:projects'], {
  failWithError: true,
});

const authError = (err, req, res, next) => {
  if (err) {
    console.log(err)
    res.sendStatus(401);
  }
  else {
    next()
  }
}

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Only go through the process of https forwarding if running production
//This effects all routes on the appication
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    //console.log("Forwarded Request received over: ", req.header('X-Forwarded-Proto'));
    if (req.header('X-Forwarded-Proto') !== 'https') {
      console.log("Redirecting to HTTPS...");
      res.redirect(`https://${req.header('host')}${req.url}`);
    }
    else
      next();
  })
  console.log("Using forced SSL...")
  mongo_uri = process.env.MONGO_URI;
  client = new MongoClient(mongo_uri);
} else {
  fs.readFile(mongoUriFile, 'utf-8', (err, data) => {
    mongo_uri = data;
    console.log("Using URI: ", mongo_uri);
    client = new MongoClient(mongo_uri);

    if (err) {
      console.log("hmm")
      throw err;
    }
  });
}
console.log("Set Mongo URI: ", mongo_uri);


//Try putting this last
app.use(express.static(dir));

// Data GET Methods:

app.get('/api/projects',(req, res) => {
  console.log("Projects requested.")
  if (!client) {
    console.log("[ERROR] Undefined Client");
  }
  //@todo: Reconfigre these names, jeez
  mongoQuery(client, 'projects', 'Projects', req.method, {}, (result) => {
    res.json(result);
  })
});


app.get('/api/tags',(req, res) => {
  console.log("Tags requested.")
  if (!client) {
    console.log("[ERROR] Undefined Client");
  }
  //@todo: Reconfigre these names, jeez
  mongoQuery(client, 'tags', 'Tags', req.method, {}, (result) => {
    res.json(result);
  })
});

app.get('/api/auth/write_privileges', jwtCheck, projectWriteCheck, (err, req, res, next) => {
    //Middle ware for returning responses to unauthorized clients
    if(err) {
      console.log("Write status denied")
      res.json(
        {
          "privileges": false
        }
      );
    } else {
      next();
    }
  }, (req, res) => {
    console.log("Write status approved")
    res.json(
      {
        "privileges": true
      }
    )
});

app.post('/api/projects', tokenLog, jwtCheck, projectWriteCheck, authError, (req, res) => {
  let newProject = req.body;
  if (!client) {
    console.log("[ERROR] Undefined Client");
  }
  //@todo: Reconfigre these names, jeez
  mongoQuery(client, 'projects', 'Projects', req.method, newProject, (result) => {
    console.log("Project Added: ", result.insertedId);
    newProject._id = result.insertedId;
    res.json({
      data: newProject
    })
  })
});

app.delete('/api/projects/:id', tokenLog, jwtCheck, projectWriteCheck, (req, res) => {
  let id = req.params.id;
  mongoQuery(client, 'projects', 'Projects', req.method, {_id: id}, (result) => {
    console.log("Project deleted: ", id);
    res.send();
  })
});

app.put('/api/projects', tokenLog, jwtCheck, projectWriteCheck, (req, res) => {
  let updatedProject = req.body;
  //@todo: Reconfigre these names, jeez
  mongoQuery(client, 'projects', 'Projects', req.method, updatedProject, (result) => {
    console.log("Number Projects updated: ", result.modifiedCount);
    res.json({
      data: updatedProject
    })
  })
});

//Angular handles the routing
app.get("/*", (req, res) => {
  res.sendFile('index.html', {root: 'dist/krondor/'})
});

// Listen on all interfaces
app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening", process.env.PORT || 3000,"!")
  if (process.env.NODE_ENV === 'production') {
    console.log("Server running in production mode.");
  }
  else {
    console.log("Server running in development mode.")
  }
});
