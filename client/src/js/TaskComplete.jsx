import React, { useState, useEffect } from 'react';
import PageContainer from './PageContainer';
import {useParams} from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';
import TextLoop from "react-text-loop";

const TaskCompleteComponent = ({ completeTask }) => {
  let history = useHistory();
  let {taskId} = useParams();

  const [show, setShow] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const getTask = async (id) => {
      const resp = await fetch(`/api/tasks/one/${id}`);
      const task = await resp.json();
      console.log(task);
      setName(task.name);
    }
    getTask(taskId);
  }, []);

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
          <h2>{name}</h2>
          <Button className="green-1 button-1 shadow-none" type="button" onClick={handleExit}>Back to Home</Button>
        </div>
        : <div>
          <h2>{name}</h2>
          <p>was not completed in time. Uh oh.</p>
          <div className="animated fadeOut">
            <TextLoop interval={50} >
              <span>Punishment #1</span>
              <span>Punishment #2</span>
              <span>Punishment #3</span>
              <span>Punishment #4</span>
              <span>Punishment #5</span>
              <span>Punishment #6</span>
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
      { window.location.pathname.includes("/complete") ?
        <TaskCompleteComponent completeTask={true} />
        : <TaskCompleteComponent completeTask={false} />
      }
    </PageContainer>
  )
}

export default TaskCompletePage;
