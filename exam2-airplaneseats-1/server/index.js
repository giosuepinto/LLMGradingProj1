'use strict';

// imports
const express = require('express');
const morgan = require('morgan');
const {check, validationResult} = require('express-validator');
const cors = require('cors');
const userDao = require('./user-dao');
const seatsDao = require('./seats-dao');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// init
const app = new express();
const port = 3001;

// set up middlewares
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));


/********************************PASSPORT**************************************/

// Passport: set up local strategy --> authentication process
passport.use(new LocalStrategy(async function verify(username, password, cb) { // verify user credentials
  const user = await userDao.getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) { //  what data from the user object should be stored in the session(id,email,name)
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { // retrieves the user object from the session based on the serialized data (id + email + name)
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

const isLoggedIn = (req, res, next) => { // checks if user is authenticated
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({ // manage session data for each user
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session')); // checks if the request contains a valid session and if the user is authenticated

/*****************************************************************************/

/* ROUTES */

// GET /api/seats
app.get('/api/seats', (req, res) => {
  seatsDao.getSeats()
  .then(seats => res.json(seats))
  .catch(() => res.status(500).end())
});

// DELETE /api/seats
app.delete('/api/seats', (req, res) => {
  seatsDao.deleteSeats(req.body.id, req.body.type)
  .then(res.status(200).json('ok'))
  .catch(() => res.status(500).end())
});

// POST /api/seats
app.post('/api/seats', async (req, res) => {
  try {
    const seatPromises = req.body.seats.map((s) => seatsDao.saveSeat(req.body.id, req.body.type, s))
    await Promise.all(seatPromises)
    res.status(200).json('ok')
  } catch(error) {
    console.log(error)
    res.status(500).end()
  }
});

/* SESSIONS */

// POST /api/sessions
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => { // authentication process with local strategy set up
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) { // check if user is authenticated
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => { // logout
    res.end();
  });
});


/***** ACTIVATE SERVER *****/
app.listen(port, () => { console.log(`Server listening at http://localhost:${port}`); });
/***************************/