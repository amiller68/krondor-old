const express = require("express");
const data = require('./db.json');
const app = express();

// Get our server's path
const path = require('path');
const dir = path.join(__dirname, 'dist/krondor/');

app.use(express.static(dir));

app.get('/api/projects',(req, res) => {
  console.log("Projects requested.")
  res.json(
    {
      "projects": data.projects,
      "tags": data.tags
    });
});

//Angular handles the routing
app.get("/*", (req, res) => {
  res.sendFile('index.html', {root: 'dist/krondor/'})
});

// Listen on all interfaces
app.listen(process.env.PORT || 3000, () => console.log("Server listening", process.env.PORT || 3000,"!"));
