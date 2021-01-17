import React from 'react';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';


const TaskCompleteComponent = () => {
  let history = useHistory();

  let handleExit = () => {
    history.push("/todo");
  }

  return (
    <div className="module authpage green-2">
      <p>
        Congratulations on completing your task!
      </p>
        <h2>Task Name {/* change based on task */}</h2>
      <Button className="green-1 button-1 shadow-none" type="button" onClick={handleExit}>Back to Home</Button>
    </div>
  )
}
const TaskCompletePage = () => {
  return (
    <PageContainer className="FormPage">
      <TaskCompleteComponent />
    </PageContainer>
  )
}

export default TaskCompletePage;
