import { Container, Row, Button, Col, Alert, Card, InputGroup, FormGroup, Form} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import API from '../API';


export function ReservationButtons(props) {
    const [hasReservation, setHasReservation] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showChoice, setShowChoice] = useState(false)
    const [reservButton, setReservButton] = useState(false)
    const setShowSelection = props.setShowSelection;
    const showSelection = props.showSelection
    const chosenSeats = props.chosenSeats

    let type = props.type
    let total = 0;
    if (type === 'international') total = 150
    if (type === 'local') total = 60
    if (type === 'regional') total = 100

    const confirmSeats = () => {
      props.setSeatsToReserve(chosenSeats);
      setShowSelection(false); 
      setReservButton(false); 
    }

    //check reservation
    useEffect(() => {
    // check user has a reservation
      const checkReservation = () => {
        const seatsFounded = props.seats.filter((s) => s.userID === props.user.id)
        if (seatsFounded.length === 0) setHasReservation(false);
        else setHasReservation(true)
      };
      checkReservation();
    }, [props.seats, props.user.id]);
  
    // delete all seats reserved by the user
    const deleteReservation = async () => {
      try {
        await API.deleteSeats(props.user.id, type);
        props.setIsActionTaken(true) // user performs an action on seats, so it should be managed (updated seats calling API getOccupiedSeats)
      } catch (error) {
        console.log(error)
      }
    };
  
    return (
      <>
        <Row>
          {/* Button to cancel the reservation, if already have one, or to create a new reservation, if not already have one */}
          {hasReservation ? (
            <>
              <Button variant="danger" style={{ marginLeft: '6.5em', marginTop: '4em' }} size="lg" onClick={() => deleteReservation()}>
                Cancel Reservation
              </Button>
            </>
          ) : (
            <Button style={{ marginLeft: '6.5em', marginTop: '4em'}} size="lg" onClick={() => {setShowChoice(true); setReservButton(true)}} disabled={reservButton} >
              Make a New Reservation for this plane
            </Button>
          )}
        </Row>
        <Row>
          {/* Button to choose one of the two mode for reserving: random or selection */}
          { showChoice ? 
          <>
            <div style={{padding:'1em', marginLeft: '11em', marginTop:'3em'}}>
            <Button style={{marginRight: '1em'}} onClick={() => {setShowForm(true); setShowChoice(false)}}>Pick Random Seats</Button>
            <Button onClick={() => {setShowSelection(true); setShowChoice(false)}}>Choose your Seats</Button>
            </div>
            <Button style={{width:'10em', marginLeft: '18em'}} variant='danger' onClick={() => {setShowSelection(false); setShowChoice(false); setReservButton(false); props.setSeatsToReserve([])}}>Cancel</Button>
          </>
          :
          <></>
          }
        </Row>
        <Row>
          {/* SELECTION */}
          { showSelection ? 
          <div style={{ textAlign:'center', marginLeft:'7em', marginTop:'2em'}}>
            <Button 
            variant='success' 
            style={{width:'14em'}} 
            onClick={() => confirmSeats()}
            >
              Confirm Reservated Seats
            </Button> 
            <Button style={{width:'8em', marginLeft: '1em'}} variant='danger' onClick={() => {setShowSelection(false); setReservButton(false); props.setSeatsToReserve([])}}>Cancel</Button>
          </div>
          :
          <></>
          }
        </Row>
        <Row>
          {/* RANDOM */}
          { showForm ? 
          <SeatsForm 
            max={total-props.seats.length} 
            seats={props.seats} 
            setShowForm={setShowForm} 
            setReservButton={setReservButton} 
            type={type} 
            setSeatsToReserve={props.setSeatsToReserve}
            seatsToReserve={props.seatsToReserve}
            saveReservation={props.saveReservation}/>
          :
          <></>
          }
        </Row>
      </>
    );
}
 
// Form for random pick of the seats
function SeatsForm(props) {
  const [numSeats, setNumSeats] = useState(0)

  // Handle input change for the number of seats
  function handleInputChange(event) {
    setNumSeats(event.target.value)
  }
  
  // Pick random seats from available ones and call the saveReservation function with the generated seats
  function createReservation(event) { 
    event.preventDefault();
    let letters = ["A", "B", "C", "D"];
    let maxRow = 0;
    let newSeats = [];
  
    // Determine the maximum row number and letter options based on the plane type
    if (props.type === 'local') {
      maxRow = 15;
    }
    if (props.type === 'international') {
      letters = ["A", "B", "C", "D", "E", "F"];
      maxRow = 20;
    }
    if (props.type === 'regional') {
      letters = ["A", "B", "C", "D", "E"];
      maxRow = 25;
    }
  
    // Generate random seats based on the specified number
    for (let i = 0; i < numSeats; i++) {
      let randomSeat;
      do {
        // Generate random row number, letter, and combine them to form a seat code
        const randomIndex = Math.floor(Math.random() * letters.length);
        const randomNumber = Math.floor(Math.random() * maxRow) + 1;
        const randomLetter = letters[randomIndex];
        randomSeat = randomNumber.toString() + randomLetter;
      } while ( props.seats.filter(s => s.code === randomSeat && s.planeType === props.type).length !== 0 || newSeats.includes(randomSeat)); 
      // Check seat is not occupied OR seat already generated (no duplicates obviously, user must have n different seats)
      
      // Seat available, so added to the seats to reserve
      newSeats.push(randomSeat);
    }
    props.setSeatsToReserve(newSeats);
    props.setShowForm(false); 
    props.setReservButton(false);
  } 
  
  return (
    <Row>
      <Form style={{padding: '1em', border:'2px solid blue', marginLeft: '9em', marginTop:'2em', textAlign:'center'}} onSubmit={createReservation}>
      <FormGroup>
        <label style={{marginRight:'1em'}}>Number of seats to reserve: </label>
        <input type="number" min={1} max={props.max} value={numSeats} onChange={handleInputChange}/> 
        </FormGroup>
        <div style={{marginTop:'1em'}}>
        <Button style={{marginLeft:'1em'}} type='submit'>Reserve</Button> 
        </div>
      </Form>
      <Button variant='danger' style={{marginLeft:'9em'}} onClick={() => {props.setShowForm(false); props.setReservButton(false); props.setSeatsToReserve([])}}>Cancel</Button> 
    </Row>

  )
}
  

  
  
  
  
   