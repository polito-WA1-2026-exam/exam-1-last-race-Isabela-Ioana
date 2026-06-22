// imports
import express from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import cors from "cors";
import { Stations, myStations } from './DataModels/Stations.js';
import {checkUserPassword, generateGameStations, getRandomEvents, saveScoreInDB, getLeaderboardFromDB, verifyRouteLogic } from "./db_communication.js";

// init express
const app = new express();
const port = 3000;

app.use(express.json())

const corsOptions={             //server communicates with front end 
  origin:'http://localhost:5173',
  optionsSuccessState: 200,
  credentials:true
}
app.use(cors(corsOptions))

app.use(session({
  secret: "ioana's secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate("session"));

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



// ROUTES


const myStations1= new myStations()

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


//  GET /api/stations
app.get("/api/stations", [isLoggedIn],async (req,res)=>{
    try{
      const [stations,connections]= await Promise.all([myStations1.retrieveStations(),myStations1.retrieveConnections()])
      res.status(200).json({stations,connections})
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
})



app.get("/api/game/start", [isLoggedIn], async (req, res) => {
    try {
        const stations = await myStations1.retrieveStations();
        const connections = await myStations1.retrieveConnections();

        const gameSetup = generateGameStations(stations, connections);
        
        res.json(gameSetup); 
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/api/game/start/segments", [isLoggedIn], async(req,res)=>{
  try{
    const segments= await myStations1.retrieveBidirectionalConnections()
    res.status(200).json(segments)

  }catch(err){
        res.status(500).json(err);
  }

})

app.post('/api/events', [isLoggedIn], async (req, res)=> {
  try{
    const nbOfEvents = req.body.numberOfEvents
    const result = await getRandomEvents(nbOfEvents)

    if (result.error){
      return res.status(500).json({
        message: "ERROR!",
        error: result.error
      })
    }
    else{
      return res.json(result)
    }
  }
  catch(err){
       return res.status(500).json({
        message: "ERROR!",
        error: err
      })
  }
})

app.post('/api/ranking', [isLoggedIn], async(req,res)=>{
  try{
    const {userId, score, date}= req.body
    const result= await saveScoreInDB(userId, score, date)
    if (result.error) {
      return res.status(500).json({
        message: "ERROR!",
        error: result.error
      })
    } else {
      return res.json(result)
    }
  }
  catch(err){
    res.status(500).json({
      message: "ERROR!",
      error: err.message
    });
  }
})


app.get('/api/ranking', [isLoggedIn], async (req, res) => {
  try {
    const result = await getLeaderboardFromDB();

    if (result.error) {
      return res.status(500).json({
        message: "ERROR!",
        error: result.error
      });
    } else {
      return res.json(result); 
    }
  } 
  catch (err) {
    return res.status(500).json({
      message: "ERROR!",
      error: err.message || err
    });
  }
});


app.post('/api/game/verify', [isLoggedIn], (req, res) => {
    try {
        const { chosenRoute, startStation, endStation } = req.body;
        
        const result = verifyRouteLogic(chosenRoute, startStation, endStation);
        
        if (result.error) {
            return res.json({ isValid: false, message: result.error });
        } 
        
        return res.json({ isValid: true });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error during validation", error: err.message });
    }
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});