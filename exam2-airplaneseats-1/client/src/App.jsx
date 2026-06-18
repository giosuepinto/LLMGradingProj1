import { useEffect, useState } from 'react';
import API from './API';
import NavHeader from './components/NavHeader-component';
import { LoginForm } from './components/Auth-component';
import { PlanesContent, PlanesChoice } from './components/PlanesView-component';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Container, Alert, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  // State variables
  const [loggedIn, setLoggedIn] = useState(null); // Stores the logged-in user
  const [message, setMessage] = useState(null); // Stores messages to display to the user
  const [localSeats, setLocalSeats] = useState(null) // Stores occupied seats of local planes
  const [regionalSeats, setRegionalSeats] = useState(null) // Stores occupied seats of regional planes
  const [internationalSeats, setInternationalSeats] = useState(null) // Stores occupied seats of international planes
  const [isActionTaken, setIsActionTaken] = useState(false) // Indicates if a user has performed an action on seats
  

  // Fetch occupied seats from the API
  useEffect(()=> {
    const getOccupiedSeats = async () => {
      const seats = await API.getOccupiedSeats(); // API call
      
      const local = seats.filter(seat => seat.planeType === 'local')
      const international = seats.filter(seat => seat.planeType === 'international')
      const regional = seats.filter(seat => seat.planeType === 'regional')

      // State variables updated
      setLocalSeats(local);
      setInternationalSeats(international)
      setRegionalSeats(regional)
      setIsActionTaken(false) // Reset the user action flag
    }
    getOccupiedSeats();
  }, [isActionTaken] ); // triggered everytime a user has performed an action on seats

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo(); // fetch user info if authenticated

      // State variable updated
      setLoggedIn(user);
    };
    checkAuth();
  }, []); // triggered on the first render

  // Handle user login
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials); // API call

      // State variables updated
      setLoggedIn(user);
      setMessage({msg: `Welcome, ${user.username}!`, type: 'success'});
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    await API.logOut(); // API call

    // State variables updated
    setLoggedIn(null)
    setMessage({msg: "It's so sad to see you going away... Come back soon, have a nice day!", type: 'info'});
  };

 
  return (
    <Router>
      <Routes>
        <Route element={
          <>
            {/* Navigation header */}
            <NavHeader loggedIn={loggedIn} handleLogout={handleLogout} />
            <Container fluid className="mt-3">
              {/* Display messages to the user */}
              { message && 
                <Row>
                  <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>{message.msg}</Alert>
                </Row> }
              
                <Outlet/> {/* Render the nested routes */}
            </Container>
          </>
        } >
          {/* Nested routes */}
          <Route 
              index 
              element={<PlanesChoice user={loggedIn} />} 
          />
          <Route 
              path='/local' 
              element={ <PlanesContent user={loggedIn} type={'local'} seats={localSeats} setIsActionTaken={setIsActionTaken}/>} 
          /> 
          <Route 
              path='/regional' 
              element={ <PlanesContent user={loggedIn} type={'regional'} seats={regionalSeats} setIsActionTaken={setIsActionTaken} />} 
          />
          <Route 
              path='/international' 
              element={ <PlanesContent user={loggedIn} type={'international'} seats={internationalSeats} setIsActionTaken={setIsActionTaken}/>} 
          /> 
          <Route 
              path='/login' 
              element={ loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin} />} 
          /> 
          <Route 
              path='/:username'
              element={<PlanesChoice user={loggedIn} />} 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

