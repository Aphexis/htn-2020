import React, { useState } from 'react';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  const hours = ("0" + Math.floor(remainingTime / 3600)).slice(-2)
  const minutes = ("0" + Math.floor((remainingTime % 3600) / 60)).slice(-2)
  const seconds = ("0" + remainingTime % 60).slice(-2)

  return `${hours}:${minutes}:${seconds}`
};

function ClockComponent() {
  return (
    <div
      className="timer-wrapper"
      style={{
        display: "flex",
        justifyContent: "center"
      }}>
      <CountdownCircleTimer
        isPlaying
        duration={28900} //change duration based on task
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}>
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

const CurrentTaskComponent = () => {
  let history = useHistory();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  let handleClose = () => setShow(false);
  
  let handleCompleted = () => {
    history.push("/taskcomplete");
  }

  let handleExit = () => {
    history.push("/todo");
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

  let handleEdit = () => {
    // let requestOptions = {
    //   method: "POST",
    //   headers: { 'Content-Type': 'application/json' },
    //   // body: JSON.stringify({ "message" : "hello there my dear friend. it is nice to see you again."})
    // };

    fetch('/api/verify/request')
    .then(res => res.json)

    setShow(true);
  }

  return (
    <div className="module authpage green-2">
      <h1>
        Task Name {/* change based on task */}
      </h1>
      <br />
      <ClockComponent />
      <br />
      <p className="changing motivation">
        Motivational Line Here {/* change based on timing */}
      </p>
      <div className="button-div">
        <Button className="module green-1 button-1 shadow-none" type="button" onClick={handleEdit}>Edit Task</Button>
        <Modal className="modal" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Verify testing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p className="text-muted">Ask your friend for the code!</p>
            <label>Enter your verification code:</label>
            <input type="number" placeholder="####" value={value} onChange={handleChange} />
            <br />
            <Button className="module green-1 button-1 shadow-none" type="button" onClick={handleSubmit}>Verify</Button>
          </Modal.Body>
        </Modal>
        <Button className="module green-1 button-1 shadow-none" type="button" onClick={handleCompleted}>Task Completed!</Button>
        <Button className="mmodule green-1 button-1 shadow-none" type="button" onClick={handleExit}>Exit Work Mode</Button>
      </div>
    </div>
  )
}

const CurrentTaskPage = () => {
  return (
    <PageContainer className="FormPage">
      <CurrentTaskComponent />
    </PageContainer>
  )
}

export default CurrentTaskPage;
