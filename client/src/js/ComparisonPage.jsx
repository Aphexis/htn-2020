import React from 'react';
import {useParams} from 'react-router-dom';
import PageContainer from './PageContainer';

export const ComparisonComponent = () => {
  let {comparisonId} = useParams();
  return (
    <div>
        <h2>This is the comparison page.</h2>
        {comparisonId && <h3>Comparison ID: {comparisonId}</h3>}
    </div>
  );
}

const ComparisonPage = () => {
  return (
    <PageContainer hasHeader className="ComparisonPage">
      <ComparisonComponent />
    </PageContainer>
  )
}

export default ComparisonPage;
