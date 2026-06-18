import './style/seat-style.css';
import { Button, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

/************************* ROWS **************************/

// Component for rendering a row of seats in an international plane
export function SeatRowInternational(props) {

    // Extract props
    const showSelection = props.showSelection;
    const setSeatsToReserve = props.setSeatsToReserve;
    const rowNumber = props.rowNumber;
    const chosenSeats = props.chosenSeats;
    const setChosenSeats = props.setChosenSeats;

    // Filter seats for the specific row number
    const seats = [...props.seats].filter(seat => {
        const seatRowNumber = seat.code.match(/^\d+/); // Extract the row number using a regular expression
        return seatRowNumber && seatRowNumber[0] === rowNumber.toString();
      });

    // Render seat row
    return (
        <Row className='seats-international'>
            {/* Render individual seats */}
            <Col className='seat col-sm-1'>
                {/* Render seat component */}
                <Seat code={rowNumber+"A"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'A') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"B"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'B') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"C"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'C') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"D"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'D') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"E"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'E') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"F"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'F') == 0) ? false : true} />
            </Col>
        </Row>        
    )
}

// Component for rendering a row of seats in a local plane
export function SeatRowLocal(props) {

    const showSelection = props.showSelection;
    const rowNumber = props.rowNumber;
    const setSeatsToReserve = props.setSeatsToReserve;
    const chosenSeats = props.chosenSeats;
    const setChosenSeats = props.setChosenSeats;
    const seatsOccupied = [...props.seats].filter(seat => {
        const seatRowNumber = seat.code.match(/^\d+/); // Extract the row number using a regular expression
        return seatRowNumber && seatRowNumber[0] === rowNumber.toString();
      });
    return (
        <Row className='seats-local'>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"A"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seatsOccupied.filter(seat => seat.code === rowNumber+'A').length == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"B"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seatsOccupied.filter(seat => seat.code === rowNumber+'B').length == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"C"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seatsOccupied.filter(seat => seat.code === rowNumber+'C').length == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"D"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seatsOccupied.filter(seat => seat.code === rowNumber+'D').length == 0) ? false : true} />
            </Col>         
        </Row> 
    )
}

// Component for rendering a row of seats in a regional plane
export function SeatRowRegional(props) {
    const showSelection = props.showSelection;
    const rowNumber = props.rowNumber;
    const setSeatsToReserve = props.setSeatsToReserve;
    const chosenSeats = props.chosenSeats;
    const setChosenSeats = props.setChosenSeats;
    const seats = [...props.seats].filter(seat => {
        const seatRowNumber = seat.code.match(/^\d+/); // Extract the row number using a regular expression
        return seatRowNumber && seatRowNumber[0] === rowNumber.toString();
      });

    return (
        <Row className='seats-regional'>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"A"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'A') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"B"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'B') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"C"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'C') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"D"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'D') == 0) ? false : true} />
            </Col>
            <Col className='seat col-sm-1'>
                <Seat code={rowNumber+"E"} user={props.user} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} showSelection={showSelection} setSeatsToReserve={setSeatsToReserve} isDisabled={(seats.filter(seat => seat.code === rowNumber+'E') == 0) ? false : true} />
            </Col>
        </Row>     
    )
}

/************************* SEATS **************************/

// Component for rendering an individual seat
export function Seat(props) {

    // Define state variable
    const [isSelected,setIsSelected] = useState(false);

    // Extracted props
    let isDisabled = props.isDisabled;
    const code = props.code
    const user = props.user
    const showSelection = props.showSelection;
    const setSeatsToReserve = props.setSeatsToReserve;
    const setChosenSeats = props.setChosenSeats;
    const chosenSeats = props.chosenSeats;

    // Handle seat click event
    const handleClick = () => {
        if (!user || !showSelection) return;
        isSelected && showSelection ? setIsSelected(false) : setIsSelected(true)
    }

    // Update chosenSeats when isSelected changes
    useEffect(() => {
        if (isSelected && chosenSeats.filter((seat) => seat === code).length === 0) 
            setChosenSeats([...chosenSeats, code]) // if selected and not in the array, add it
        if (!isSelected && chosenSeats.filter((seat) => seat === code).length != 0) 
            setChosenSeats(chosenSeats.filter((seat) => seat !== code)) //if unselected and in teh array, remove it
    }), [isSelected]
    

    // if showSelection is set on false --> cancel button is clicked on reservation form --> all selected seats are unselected
    useEffect(() => { if(!showSelection) setIsSelected(false)}, [showSelection]) 

    // Render seat button
    return(
        <>
          { 
            isDisabled ? 
            <Button 
                variant = 'primary' 
                className='btn btn-default' 
                style={{ width: '40px', height: '40px',display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3px', cursor:"not-allowed" }} 
                id="1A" 
                disabled
                onClick={() => handleClick()}  
                checked={isSelected ? true : false} >
                    <label style={{cursor:"not-allowed"}}>X</label>
            </Button>
            : 
            <Button 
                variant = {isSelected ? 'success' : 'primary' }
                className={`btn btn-default not-logged`}
                style={{ width: '40px', height: '40px',display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3px', cursor: user && showSelection ? "pointer" : "not-allowed"  }} 
                //disabled={showSelection ? 'false' : 'true'}
                onClick={() => handleClick()}  
                checked={isSelected ? true : false} >
                    <label className={`not-logged`} style={{cursor: user && showSelection ? "pointer" : "not-allowed" }} >{code}</label>
            </Button>
            }
        </>
    )
}