import React from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';


const NewTaskComponent = () => {
  const location = useLocation();

  return (
    <div>
        <h2>This is the new task page.</h2>
    </div>
  )
}
const NewTaskPage = () => {
  return (
    <PageContainer className="FormPage">
      <NewTaskComponent />
    </PageContainer>
  )
}

export default NewTaskPage;
