import React from 'react';
import {Link} from 'react-router-dom';
import PageContainer from './PageContainer';

const LandingComponent = () => {
  return (
    <div>
        <h2>This is the landing page.</h2>
        <Link to={{
            pathname: '/form',
            state: {fromLanding: false} // seems to be true by default? a bit weird.
        }}>Form page</Link>
        {/* use history.push? not sure if this actually works. https://stackoverflow.com/questions/58506891/how-to-get-data-from-prop-location-state-in-react */}
        <Link to='/comparison/123'>Comparison page</Link>
    </div>
  );
}

const LandingPage = () => {
  return (
    <PageContainer hasHeader className="LandingPage">
      <LandingComponent />
    </PageContainer>
  )
}

export default LandingPage;
