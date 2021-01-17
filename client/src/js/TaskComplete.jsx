import React from 'react';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';


const TaskCompleteComponent = () => {
  let history = useHistory();

  return (
    <div className="module authpage green-2">
        <h2>This is the task complete page.</h2>
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
