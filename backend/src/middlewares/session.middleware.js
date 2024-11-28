const session = require("express-session");
const { config } = require("../configs/general.config");

const sessionMiddleware = session({
  secret: config.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: config.ENV === 'production' }
})

module.exports = { sessionMiddleware };