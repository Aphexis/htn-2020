import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Vonage = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  let handleClose = () => setShow(false);
  

  let sendText = () => {
    console.log("send text button pressed")
    let requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "message" : "hello there my dear friend. it is nice to see you again."})
    };

    fetch('/api/sendText', requestOptions)
    .then(res => res.json)
    
  }

  let makeCall = () => {
    let requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "message" : "hello there my dear friend. it is nice to see you again."})
    };

    fetch('/api/makeCall', requestOptions)
    .then(res => res.json)

  }

  let verifyButtonPressed = () => {
    // let requestOptions = {
    //   method: "POST",
    //   headers: { 'Content-Type': 'application/json' },
    //   // body: JSON.stringify({ "message" : "hello there my dear friend. it is nice to see you again."})
    // };

    fetch('/api/verify/request')
    .then(res => res.json)

    setShow(true);
  }

  let handleSubmit = () => {
    // console.log(value);
    let requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "pin" : `${value}`})
    };

    fetch('/api/verify/check', requestOptions)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res) {
        setShow(false);
      } else {
        console.log("Incorrect PIN");
      }
    })

    // setShow(false);
  }

  let handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div>
        <h2>This is the landing page.</h2>
        <Link to={{
            pathname: '/form',
            state: {fromLanding: false} // seems to be true by default? a bit weird.
        }}>Form page</Link>
        {/* use history.push? not sure if this actually works. https://stackoverflow.com/questions/58506891/how-to-get-data-from-prop-location-state-in-react */}
        <Link to='/comparison/123'>Comparison page</Link>
        <Button onClick={sendText} type="button">send a text</Button>
        <Button onClick={makeCall} type="button">make a call</Button>
        <Button onClick={verifyButtonPressed} type="button">send a code</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Verify testing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Enter your verification code below.</label>
            <input type="number" placeholder="4-digit verification code" value={value} onChange={handleChange}/>
            <p className="text-muted">Check your phone!</p>
            <Button type="button" onClick={handleSubmit}>Verify</Button>
          </Modal.Body>
        </Modal>
    </div>
  );
}

const VonagePage = () => {
  return (
    <PageContainer>
      <Vonage />
    </PageContainer>
  )
}

export default VonagePage;
