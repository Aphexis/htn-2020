import React from 'react';
import '../css/PageContainer.scss';

// default page container with header/nav, etc. that wraps every component

const PageContainer = ({className, children, hasHeader = true}) => {
    return (
        <div className="PageContainer">
            <div className={className}>
                {children}
            </div>
        </div>
    )
};

export default PageContainer;
