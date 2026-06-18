import { useState } from 'react';
import {Form, Button, Card, Container} from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

// Login form component
function LoginForm(props) {
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Handle form submission
  const handleSubmit = (event) => {
      event.preventDefault();
      const credentials = { username, password };
      props.login(credentials);  // call login function in App.jsx with credentials just inserted by the user
  };

  return (
    // Login form layout
    <body className="d-flex justify-content-center align-items-start vh-100" style={{ background: '#eaf2f8', border: '1px'}}>
        <Card className='border-primary' style={{ border: '8px solid', width: '90%', marginTop: '70px'}}>
            <Card.Body>
                <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                <Form.Group controlId='username' style={{ border: '2px solid blue', background:'#eaf2f8', borderColor: 'blue', width: '90%', padding: '10px', marginTop: '20px'  }}>
                    <Form.Label style={{fontWeight: 'bold'}}>Username</Form.Label>
                    <Form.Control type='text' value={username} onChange={ev => setUsername(ev.target.value)} style={{marginTop: '20px', border:'1px solid lightgray' }}required={true} />
                </Form.Group>

                <Form.Group controlId='password' style={{ border: '2px solid blue', background:'#eaf2f8', width: '90%', padding: '10px', marginTop: '20px' }}>
                    <Form.Label style={{fontWeight: 'bold'}}>Password</Form.Label>
                    <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} style={{marginTop: '20px', border:'1px solid lightgray' }} required={true} minLength={6}/>
                </Form.Group>

                <Button type="submit" className='btn-lg align-items-center' style={{marginTop: '30px', }}>Login</Button>
                </Form>
            </Card.Body>
        </Card>
    </body>
  )
};

// Logout button component (used in Navheader)
function LogoutButton(props) {
  return(
    <Button variant='outline-light' onClick={props.logout}>Logout</Button> // call logout function in App.jsx
  )
}

export { LoginForm, LogoutButton };