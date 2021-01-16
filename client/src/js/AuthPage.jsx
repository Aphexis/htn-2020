import React from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';


const AuthComponent = () => {
  return (
    <div>
        <h2>History</h2>
    </div>
  )
}

const AuthPage = () => {
  return (
    <PageContainer hasHeader className="FormPage">
      <AuthComponent />
    </PageContainer>
  )
}

export default AuthPage;
