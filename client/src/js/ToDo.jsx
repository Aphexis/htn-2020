import React from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';


const ToDoComponent = () => {
  const location = useLocation();

  return (
    <div>
        <h2>This is the todo page.</h2>
    </div>
  )
}
const ToDoPage = () => {
  return (
    <PageContainer className="FormPage">
      <FormComponent />
    </PageContainer>
  )
}

export default ToDoPage;
