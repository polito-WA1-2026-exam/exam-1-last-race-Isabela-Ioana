// imports
import express from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import checkUserPassword from "./db_communication.js";

// init express
const app = new express();
const port = 3000;

app.use(express.json())



passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await checkUserPassword(username, password);
  
  if(!user)
    return cb(null, false, "Incorrect username or password."); 
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: "Not authorized"});
}

app.use(session({
  secret: "ioana's secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate("session"));


// ROUTES

app.post("/api/sessions", passport.authenticate("local"), function(req, res) {
  return res.status(201).json(req.user);
});

//logged in

// GET /api/sessions/current
app.get("/api/sessions/current", (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: "Not authenticated"});
});

// DELETE /api/session/current
app.delete("/api/sessions/current", (req, res) => {
  req.logout(() => {
    res.end();
  });
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});