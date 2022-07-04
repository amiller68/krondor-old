console.log("Node Version: ", process.version);
console.log("Node Environment: ", process.env.NODE_ENV);
/* Imports */
const express = require('express');
const bodyParser = require('body-parser');
const { httpsRedirect } = require('./middleware/https');
const path = require('path');
const apiRoutes = require('./routes/api');

// Declare our app
const app = express();
const dir = path.join(__dirname, '../dist/krondor/');

/* Application Middleware */
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.static(dir));
app.use(httpsRedirect);

// /* Declare our routes */
// app.use('/api', apiRoutes);
//

/* Wildcard route for serving the Angular app */
app.get('/', (req, res) => {
  console.log("huh");
  res.sendFile(path.join(dir, 'index.html'));
});

module.exports = app;
