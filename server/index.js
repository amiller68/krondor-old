console.log("Node Version: ", process.version);

/* Imports */
const express = require("express");
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

/* Declare our routes */
app.use('/api', apiRoutes);

/* Wildcard route for serving the Angular app */
app.get('*', (req, res) => {
  res.sendFile(path.join(dir, 'index.html'));
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
