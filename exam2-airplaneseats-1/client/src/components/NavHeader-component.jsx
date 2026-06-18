import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton } from './Auth-component';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Navigation header component
function NavHeader(props) {
  return (
    // Navbar component from react-bootstrap
  <Navbar bg="primary" variant="dark">
    <Container fluid>

      {/* Logo link */}
      <Link to='/' className='navbar-brand'> <h1>Airplanes Seats</h1></Link>

      {/* Conditional rendering based on logged-in status */}
      {props.loggedIn ? 
        <LogoutButton logout={props.handleLogout} /> : 
        <Link to='/login' className='btn btn-outline-light rounded-circle'>
          <i className='bi bi-person-circle' style={{ fontSize: '2rem' }}></i>
        </Link>
         }
    </Container>
  </Navbar>
  );
}

export default NavHeader;