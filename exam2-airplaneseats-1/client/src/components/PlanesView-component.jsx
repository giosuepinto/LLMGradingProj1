import './style/PlanesView-graphic.css';
import { SeatRowInternational, SeatRowLocal, SeatRowRegional } from './SeatManagement-component';
import { ReservationButtons} from './Reservation-component'
import { Container, Row, Button, Col, Alert, Card, Modal } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API';


// Component for choosing a plane
export function PlanesChoice(props) {
    const navigate = useNavigate();

    // Handle navigation to specific plane type
    const handleLocalPlane = () => {
        navigate("/local")
    }
    const handleRegionalPlane = () => {
        navigate("/regional")
    }
    const handleInternationalPlane = () => {
        navigate("/international")
        
    }

    return (
        // Render plane choice options
        <Container>
            <Row style={{margin: "50px"}}>
                <h2>Choose your plane:</h2>
            </Row>
            <Row style={{margin: "50px"}}>
                <Col sm="4" xs="6" >
                    <Button style={{width: "100%", height: '500px'}} onClick={() => handleLocalPlane()}>
                         <h3>LOCAL <br/> AIRPLANE</h3>
                    </Button>    
                </Col>

                <Col sm="4" xs="6" >
                    <Button style={{width: "100%", height: '500px'}} onClick={() => handleRegionalPlane()}>
                        <h3>REGIONAL <br/> AIRPLANE</h3>
                    </Button>    
                </Col>

                <Col sm="4" xs="6" >
                    <Button style={{width: "100%", height: '500px'}} onClick={() => handleInternationalPlane()}>
                        <h3>INTERNATIONAL <br/> AIRPLANE</h3>
                    </Button>    
                </Col>
            </Row>
        </Container>
    )
}


// Component for rendering the seat selection page of a plane
export function PlanesContent(props) {
    // Define state variables
    const [seatsToReserve, setSeatsToReserve] = useState([]) // Tracks the seats chosen for reservation
    const [showSelection, setShowSelection] = useState(false) // when false, all seats buttons are disabled
    const [chosenSeats, setChosenSeats] = useState([]) // Stores the seats currently chosen by the user
    const [alertVisible, setAlertVisible] = useState(false); // Controls the visibility of reservation alert

    const type = props.type
    const seats = props.seats

   // Save reservation when seatsToReserve are updated, to avoid async problems
    useEffect(() => {
        if (seatsToReserve.length > 0) {
          saveReservation();
        }
    }, [seatsToReserve]);

    // Check seat availability and handle reservation
    const saveReservation = async () => {
        // Make API call to check seat availability
        const seatsOccupied = await API.getOccupiedSeats() 
        
        const isSeatsAvailable = seatsToReserve.every((code) => {
            return !seatsOccupied.some((seat) => { return seat.planeType === type && seat.code === code });
          });


        if (isSeatsAvailable) {
            // All seats are available, proceed with the reservation
            const res = await API.saveReservation(seatsToReserve, type, props.user.id);
            props.setIsActionTaken(true);
            alert(`Reservation Confirmed! Your seats are ${seatsToReserve}`)
        } else {
            props.setIsActionTaken(true);
            setAlertVisible(true);

            setTimeout(() => {
            setAlertVisible(false);
            }, 5000);
        };
    }
    
    // Generate seat rows based on plane type
    const generateSeatRows = () => {
        const seatRows = []
        if (type === 'international') {
            for (let i = 1; i <= 25; i++) {
                seatRows.push(<SeatRowInternational 
                                    key={i} 
                                    user={props.user} 
                                    rowNumber={i} 
                                    seats={props.seats} 
                                    setSeatsToReserve={setSeatsToReserve}
                                    chosenSeats={chosenSeats}
                                    setChosenSeats={setChosenSeats}
                                    showSelection={showSelection} />)
              }
        }
        if (type === 'local') {
            for (let i = 1; i <= 15; i++) {
                seatRows.push(<SeatRowLocal 
                                key={i} 
                                user={props.user} 
                                rowNumber={i} seats={seats} 
                                setSeatsToReserve={setSeatsToReserve} 
                                chosenSeats={chosenSeats}
                                setChosenSeats={setChosenSeats}
                                showSelection={showSelection} />)
              }
        }
        if (type === 'regional') {
            for (let i = 1; i <= 20; i++) {
                seatRows.push(<SeatRowRegional 
                                key={i} 
                                user={props.user} 
                                rowNumber={i} 
                                seats={props.seats} 
                                setSeatsToReserve={setSeatsToReserve} 
                                chosenSeats={chosenSeats}
                                setChosenSeats={setChosenSeats}
                                showSelection={showSelection} />)
              }
        }
        return seatRows;
      };

    return (
        <>
            {/* Alert in case of concurrent reservation on the same seat */}
            <Modal show={alertVisible} onHide={() => setAlertVisible(false)}>
            <Modal.Body>
                Reservation cannot be confirmed! Your seats have been taken. Please retry! 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setAlertVisible(false)}>
                Close
                </Button>
            </Modal.Footer>
            </Modal>
        { !props.user ? 
            <div className='alert'>
                <Alert variant='dark' dismissible>Hello user, I just want to warn you that if you're not logged in, you cannot select any seat. <br/> If you want to make a reservation, please click on the upper right button to login! Have a nice day!! </Alert>
            </div>
            : <></>
        }
        <Row>
            <Col xs='4'> 
                <h3 style={{marginLeft: '6em'}}>{type} plane</h3>
                <Legend type={type} seats={seats}/>
                { props.user ? <ReservationButtons
                                user={props.user} 
                                seats={seats} 
                                type={type} 
                                seatsToReserve={seatsToReserve}
                                setIsActionTaken={props.setIsActionTaken} 
                                setSeatsToReserve={setSeatsToReserve} 
                                showSelection={showSelection} 
                                setShowSelection={setShowSelection}
                                chosenSeats={chosenSeats}
                                setChosenSeats={setChosenSeats}/> 
                : <></> }
            </Col>
            <Col xs='8'>
                <div className="plane">
                    <div className="cockpit">
                        <br/> <br/> <br/> <br/> <br/>
                        <h1>Aurora Airlines <br/> Seat Selection</h1>
                    </div>
                    <div className="exit exit--front fuselage">
                
                    </div>
                    <div className='cabin fuselage'>
                    {generateSeatRows()}
                    </div>
                    <div className="exit exit--back fuselage">
                
                    </div>
                </div>
            </Col>
        </Row>
        </>
    )
}

// Component for rendering the legend of seat status
function Legend(props) {
    const type = props.type;
    let total = 0;
    if (type === 'international') total = 150
    if (type === 'local') total = 60
    if (type === 'regional') total = 100

    return (
        <>
            <Card
                className="my-2"
                style={{
                    width: '25em',
                    height: '25em',
                    marginLeft: '10em'
                }} >
                <Card.Header> Legend </Card.Header>
                <Card.Body>
                    <Card.Title tag="h5"> Seats </Card.Title>
                    <Card.Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button 
                                variant = 'primary' 
                                className='btn btn-default' 
                                style={{ width: '40px', height: '40px',display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1em', cursor:"not-allowed", marginRight:'1em'  }} 
                                disabled > X
                            </Button> <p style={{ alignSelf: 'center' }}> Seat Occupied</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button 
                                variant = 'primary' 
                                className='btn btn-default' 
                                style={{ width: '40px', height: '40px',display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1em', cursor:"not-allowed", marginRight:'1em' }} > 
                            </Button> <p style={{ alignSelf: 'center'}}>Seat Available</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button 
                                variant = 'success' 
                                className='btn btn-default' 
                                style={{ width: '40px', height: '40px',display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3px', cursor:"not-allowed", marginRight:'1em' }} > 
                            </Button> <p style={{ alignSelf: 'center', margin: 0 }}>Seat Requested</p>
                        </div>
                    </Card.Text> 
                    <Card.Header></Card.Header>
                    <Card.Text>
                        <br/>
                        <p> Total seats occupied: {props.seats.length} <br/>
                            Total seats available: {total-props.seats.length} <br/>
                            Total seats on the plane: {total} </p> 
                    </Card.Text>     
                </Card.Body>
            </Card>
        </>
    )
}
