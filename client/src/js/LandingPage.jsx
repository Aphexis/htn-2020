import React from 'react';
import { useHistory } from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button } from 'react-bootstrap';
import graphic from '../assets/landing-logo.PNG';
import '../css/PageContainer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingComponent = () => {
  let history = useHistory();
  
  return (
    <div className="landing">
        <img src={graphic} alt="blahblah" className="landing-image"/>
        <div className="button-div">
          <Button type="link" className="module green-2 button-2" onClick={() => history.push("signup")}>Sign Up</Button>
          <Button type="button" className="module green-2 button-2" onClick={() => history.push("login")}>Log In</Button>
        </div>
    </div>
  );
}

const LandingPage = () => {
  return (
    <PageContainer className="LandingPage">
      <LandingComponent />
    </PageContainer>
  )
}

export default LandingPage;
