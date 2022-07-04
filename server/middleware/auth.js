require("dotenv").config();

/**
 * Summary: Returns a middleware function that rejects requests if running in production.
 * @returns middleware function
 */
const allowLocalEdits = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.status(403).send("Forbidden");
  } else {
    next();
  }
};

module.exports = {
  allowLocalEdits,
};
