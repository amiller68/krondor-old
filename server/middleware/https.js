require("dotenv").config();

const httpsRedirect = (req, res, next) => {
  if (req.header("X-Forwarded-Proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
};

module.exports = {
  httpsRedirect,
};
