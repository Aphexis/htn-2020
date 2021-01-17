import React, { useState, useEffect } from 'react';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';
import TextLoop from "react-text-loop";

const TaskCompleteComponent = ({ completeTask }) => {
  let history = useHistory();

  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  let handleClose = () => setShow(false);
  let handleExit = () => {
    history.push("/todo");
  }

  return (
    <div className={"module authpage" + (completeTask ? " green-2" : " red")}>
      {completeTask ?
        <div>
          <p>
            Congratulations on completing your task!
          </p>
          <h2>Task Name {/* change based on task */}</h2>
          <Button className="green-1 button-1 shadow-none" type="button" onClick={handleExit}>Back to Home</Button>
        </div>
        : <div>
          <h2>Task Name {/* change based on task */}</h2>
          <p>was not completed in time</p>
          <div className="animated fadeOut">
            <TextLoop interval={50} >
              <span>Work hard 😤</span>
              <span>Go stretch! 🧘</span>
              <span>Back to work 🔥</span>
              <span>Drink water 🚰</span>
              <span>Keep going 😊</span>
              <span>Stay hydrated!</span>
            </TextLoop>{" "}
          </div>
          <div>
            <Modal className="modal fadeIn" show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Punishment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label>Punishment #1</label> {/* add punishment according to DB*/}
                <br />
                <Button className="red button-3 shadow-none" type="button" onClick={handleExit}>Back to Home</Button>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      }
    </div>
  )
}
const TaskCompletePage = () => {
  return (
    <PageContainer className="FormPage">
      { false ?
        <TaskCompleteComponent completeTask={true} />
        : <TaskCompleteComponent completeTask={false} />
      }
    </PageContainer>
  )
}

export default TaskCompletePage;
