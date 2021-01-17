import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import TextLoop from "react-text-loop";

const renderTime = ({ remainingTime }) => {
  const hours = ("0" + Math.floor(remainingTime / 3600)).slice(-2)
  const minutes = ("0" + Math.floor((remainingTime % 3600) / 60)).slice(-2)
  const seconds = ("0" + remainingTime % 60).slice(-2)

  return `${hours}:${minutes}:${seconds}`
};

function ClockComponent({duration}) {
  return (
    <div
      className="timer-wrapper"
      style={{
        display: "flex",
        justifyContent: "center"
      }}>
      <CountdownCircleTimer
        isPlaying
        duration={duration} //change duration based on task
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}>
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

const CurrentTaskComponent = () => {
  let history = useHistory();
  let {taskId} = useParams();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(-1);
  const [modal, setModal] = useState('');

  useEffect(() => {
    const failTask = async () => {
      const response = await fetch(`/api/tasks/fail/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    }
    const getTask = async (id) => {
      const resp = await fetch(`/api/tasks/one/${id}`);
      const task = await resp.json();
      console.log(task);
      setName(task.name);
      const date = new Date(task.deadline);
      const now = new Date();
      console.log(date, now)
      setDeadline(date); // turn into date obj?
      var diff = Math.abs(date - now);
      console.log(diff/1000);
      setTimeRemaining(diff/1000); // should do this based on creation time
      const interval = setInterval(() => {
        const timeNow = new Date();
        console.log(timeNow);
        if (date < timeNow) {
          // fail the task
          console.log('wow');
          // fail the task
          failTask();
          // console.log(response);
          history.push(`/todo/fail/${taskId}`);
          clearInterval(interval);
        }
      }, 1000)
    }
    console.log(taskId);
    getTask(taskId);
  }, [])

  let handleClose = () => setShow(false);

  let handleCompleted = () => {
    setShow(true);
    setModal('completed');
    // history.push("/taskcomplete");
  }

  let handleExit = () => {
    history.push("/todo");
  }

  let handleSubmit = () => {
    // console.log(value);
    let requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "pin": `${value}` })
    };

    const completeTask = async () => {
      const response = await fetch(`/api/tasks/complete/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
    }

    fetch('/api/verify/check', requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res) {
            setShow(false);
            setModal('');
          if (modal == 'edit') {
            history.push(`/todo/edit/${taskId}`);
          } else if (modal == 'completed') {
            // ADD COMPLETING API CALL
            completeTask();
            history.push(`/todo/complete/${taskId}`);
          }
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
    setModal('edit');
  }

  return (
    <div className="module authpage green-2">
      <h1>
        {name && name}
      </h1>
      <br />
      {timeRemaining >= 0 && <ClockComponent duration={timeRemaining} /> }
      <br />
      <p className="changing motivation">
        <TextLoop interval={2100} springConfig={{ stiffness: 50, damping: 4 }}>
          <span>Work hard 😤</span>
          <span>Go stretch! 🧘</span>
          <span>Back to work 🔥</span>
          <span>Drink water 🚰</span>
          <span>Keep going 😊</span>
          <span>Stay hydrated!</span>
        </TextLoop>{" "}
      </p>
      <div className="button-div">
        <Button className="green-1 button-1 shadow-none" type="button" onClick={handleEdit}>Edit Task</Button>
        <Modal className="modal" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{`Want to ${modal == 'edit' ? 'edit' : 'complete'} your task?`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">Ask your friend for the verification code!</p>
            <label>Enter your verification code:</label>
            <input type="number" placeholder="####" maxlength="4" value={value} onChange={handleChange} />
            <br />
            <Button className="green-1 button-1 shadow-none" type="button" onClick={handleSubmit}>Verify</Button>
          </Modal.Body>
        </Modal>
        <Button className="green-1 button-1 shadow-none" type="button" onClick={handleCompleted}>Task Completed!</Button>
        <Button className="green-1 button-1 shadow-none" type="button" onClick={handleExit}>Exit Work Mode</Button>
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
