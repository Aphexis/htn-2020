import React from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';


const SettingsComponent = () => {
  const location = useLocation();

  return (
    <div>
        <h2>This is the settings page.</h2>
    </div>
  )
}
const SettingsPage = () => {
  return (
    <PageContainer className="FormPage">
      <SettingsComponent />
    </PageContainer>
  )
}

export default SettingsPage;
