import React from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';


const TaskCompleteComponent = () => {
  const location = useLocation();

  return (
    <div>
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
