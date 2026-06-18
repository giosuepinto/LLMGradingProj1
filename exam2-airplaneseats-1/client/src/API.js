import { Seat } from "./models";
const SERVER_URL = 'http://localhost:3001';


// SEATS -----------


// Fetch occupied seats from the server
const getOccupiedSeats = async () => {

  // http req sent to the specified url
  const response = await fetch(SERVER_URL + '/api/seats',  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if(response.ok) {
    const seatsJson = await response.json();
    return seatsJson.map(s => new Seat(s.planeType, s.code, s.status, s.userID));
  }
  else
    throw new Error('Internal server error');
}

// Delete seats from the server
const deleteSeats = async (id, type) => {
  const response = await fetch(SERVER_URL + '/api/seats',  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // include users credentials --> request is part of the ongoing user session
    body: JSON.stringify({'id':id, 'type': type})
  });
  if(response.ok) {
    const res = await response.json();
    return res;
  }
  else
    throw new Error('Internal server error');
}

// Save reservation on the server
const saveReservation = async (seats, type, userID) => {
  const response = await fetch(SERVER_URL + '/api/seats',  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // include users credentials --> request is part of the ongoing user session
    body: JSON.stringify({'id':userID, 'type': type, 'seats':seats})
  });
  if(response.ok) {
    const res = await response.json();
    return res;
  }
  else
    throw new Error('Internal server error');
}


// USER -------------

// Log in a user with provided credentials
const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // include users credentials 
    body: JSON.stringify(credentials)
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

// Get user information for the current session
const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', { 
    credentials: 'include', // include users credentials --> request is part of the ongoing user session
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

// Log out the current user
const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include' // include users credentials --> request is part of the ongoing user session
  });
  if (response.ok)
    return null;
}


// API object containing the exported functions
const API = {logIn, logOut, getUserInfo, getOccupiedSeats, deleteSeats, saveReservation}
export default API;