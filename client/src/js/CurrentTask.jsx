import React from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';

// was in the middle of this one

const CurrentTaskComponent = () => {
  const location = useLocation();

  return (
    <div>
        <h2>This is the current task page.</h2>
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
