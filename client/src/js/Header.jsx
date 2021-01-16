import React from 'react';
import {useLocation} from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <div>
        <h1>Header!!</h1>
    </div>
  )
}

export default Header;
