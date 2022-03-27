const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser')
const enforce = require('express-sslify');

const app = express();

// Get our server's path
const path = require('path');
const dir = path.join(__dirname, 'dist/krondor/');
const dbFile = 'db.json';

app.use(express.static(dir));

if(process.env.NODE_ENV === 'production') {
  console.log("Using forced SSL...")
  app.use((req, res, next) => {
    console.log("Forwarded Request received over: ", req.header('X-Forwarded-Proto'));
    if (req.header('X-Forwarded-Proto') !== 'https') {
      console.log("Redirecting to HTTPS...");
      res.redirect(`https://${req.header('host')}${req.url}`);
    }
    else
      next()
  })
}

app.get('/api/projects',(req, res) => {
  console.log("Projects requested.")
  fs.readFile(dbFile, 'utf-8',(err, data) => {
    if (err) throw err;
    let dataObj = JSON.parse(data);
    res.json(
      {
        "projects": dataObj.projects,
        "tags": dataObj.tags
      });
  });
});

app.post('/api/projects', bodyParser.json(), (req, res) => {
  if (process.env.NODE_ENV === 'production')
  {
    res.status(401)
    res.send('Unauthorized Request');
    return;
  }
  let newProject = req.body;
  console.log("Project Added: ", req.body.id);
  fs.readFile(dbFile, 'utf-8',(err, data) => {
    if (err) throw err;
    let dataObj = JSON.parse(data);
    dataObj.projects[newProject.id] = {
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      title: newProject.title,
      description: newProject.description,
      platform: newProject.platform,
      tags: newProject.tags
    }
    // console.log("Updated data: ", dataObj);
    let updatedDataStr = JSON.stringify(dataObj, null, 2);

    fs.writeFile(dbFile, updatedDataStr, (err) => {
      if (err) throw err;
      res.json(
        {
          data: newProject
        });
    });
  });
});

app.delete('/api/projects/:id', (req, res) => {
  if (process.env.NODE_ENV === 'production')
  {
    res.status(401)
    res.send('Unauthorized Request');
    return;
  }
  let id = req.params.id;
  console.log("Project deletion requested: ", id);
  fs.readFile(dbFile, 'utf-8',(err, data) => {
    if (err) throw err;
    let dataObj = JSON.parse(data);
    delete dataObj.projects[id];

    //console.log("Updated data: ", dataObj);
    let updatedDataStr = JSON.stringify(dataObj, null, 2);

    fs.writeFile(dbFile, updatedDataStr, (err) => {
      if (err) throw err;
      res.send();
    });
  });
});

app.put('/api/projects', bodyParser.json(), (req, res) => {
  if (process.env.NODE_ENV === 'production')
  {
    res.status(401)
    res.send('Unauthorized Request');
    return;
  }
  let updatedProject = req.body;
  console.log("Project updated: ", req.body.id);
  fs.readFile(dbFile, 'utf-8',(err, data) => {
    if (err) throw err;
    let dataObj = JSON.parse(data);
    dataObj.projects[updatedProject.id] = {
      startDate: updatedProject.startDate,
      endDate: updatedProject.endDate,
      title: updatedProject.title,
      description: updatedProject.description,
      platform: updatedProject.platform,
      tags: updatedProject.tags
    }

    // console.log("Updated data: ", dataObj);
    let updatedDataStr = JSON.stringify(dataObj, null, 2);

    fs.writeFile(dbFile, updatedDataStr, (err) => {
      if (err) throw err;
       res.json(
        {
          data: updatedProject
        });
    });
  });
});

//Angular handles the routing
app.get("/*", (req, res) => {
  res.sendFile('index.html', {root: 'dist/krondor/'})
});

// Listen on all interfaces
app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening", process.env.PORT || 3000,"!")
  if (process.env.NODE_ENV === 'production') {
    console.log("Server running in production mode. Closed for requests.");
  }
  else {
    console.log("Server running in development mode. Open for requests.")
  }
});
