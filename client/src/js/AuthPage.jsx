import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const AuthComponent = () => {
  return (
    <div className="module authpage green-2">
        <h2>Log In</h2>
    </div>
  );
}

const AuthPage = () => {
  return (
    <PageContainer>
      <AuthComponent />
    </PageContainer>
  )
}

export default AuthPage;
