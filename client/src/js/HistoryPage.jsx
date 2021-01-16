import React from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';


const HistoryComponent = () => {
  const location = useLocation();

  return (
    <div>
        <h2>This is the history page.</h2>
    </div>
  )
}
const HistoryPage = () => {
  return (
    <PageContainer className="FormPage">
      <HistoryComponent />
    </PageContainer>
  )
}

export default HistoryPage;
