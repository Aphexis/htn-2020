import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';


const AuthComponent = () => {
  console.log(window.location.pathname)
  const [ username, setUsername ] = useState("");  
  const [ password, setPassword ] = useState("");
  let history = useHistory();

  let handleSubmit = () => {
    console.log(`${username} ${password}`)
    // perform check here, if it comes back true then
    let pass = true;
    if (window.location.pathname == "/signup") {

    } else {

    }

    if (pass) {
      history.push("/todo");
    } else {
      // set error message
    }
  }

  let handleChangeU = (e) => {
    setUsername(e.target.value);
  }

  let handleChangeP = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="module authpage green-2">
        <h2>{ window.location.pathname == "/signup" ? "Sign Up" : "Log In"}</h2>
        <input className="module input green-2" type="text" placeholder="username" value={username} onChange={handleChangeU}/>
        <input className="module input green-2" type="password" placeholder="password" value={password} onChange={handleChangeP}/>
        <Button className="module green-1 button-1" type="button" onClick={handleSubmit}>Submit</Button>
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
