import React from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';


const FormComponent = () => {
  const location = useLocation();

  return (
    <div>
        <h2>This is the form page.</h2>
        {location.state.fromLanding && <h3>You came from the landing page!</h3>}
    </div>
  )
}
const FormPage = () => {
  return (
    <PageContainer hasHeader className="FormPage">
      <FormComponent />
    </PageContainer>
  )
}

export default FormPage;
