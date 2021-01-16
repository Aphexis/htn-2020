import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button } from 'react-bootstrap';
import graphic from '../assets/landing-logo.PNG';
import '../css/PageContainer.scss';

const LandingComponent = () => {
  console.log(graphic);
  return (
    <div className="landing">
        <img src={graphic} alt="this is image" className="landing-image"/>
        <div className="button-div">
          <Button type="button" className="module green-2 button">Sign Up</Button>
          <Button type="button" className="module green-2 button">Log In</Button>
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
