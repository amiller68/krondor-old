const express = require("express");
const fs = require('fs');
const https = require('https');
const app = express();

// Get our server's path
const path = require('path');
const dir = path.join(__dirname, 'dist/krondor/');

app.use(express.static(dir));

app.get("/", (req, res) => {
  res.sendFile('index.html', {root: 'dist/krondor/'})
});

// Listen on all interfaces
app.listen(8080, '0.0.0.0', () => console.log("Server listening 8080", "!"));
