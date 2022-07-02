require('dotenv').config();
const app = require('./index');

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
