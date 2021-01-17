import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';


const AuthComponent = ({signUp}) => {
  const [ username, setUsername ] = useState(""); 
  const [ numberText, setNumberText ] = useState("");
  const [ numberTextRaw, setNumberTextRaw ] = useState(""); // not sure how to handle area codes, so we can probably just add a 1 to the beginning of the phone number and call it a day
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(false);
  let history = useHistory();

  let handleSubmit = async () => {
    console.log(`${username} ${numberTextRaw} ${password}`)
    // perform check here, if it comes back true then
    let pass = true;
    if (signUp) {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password, phone: numberTextRaw}),
      });
      console.log(response);
      if (response.status != 200) {
        pass = false;
      }
    } else {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password}),
      });
      console.log(response);
      // if response.status = 401, log in failed
      if (response.status == 401) {
        pass = false;
      }
    }

    if (pass) {
      setError(false);
      if (signUp) {
        history.push("/login");
      } else {
        // const response = await fetch('/api/friends');
        // console.log(response);
        history.push("/todo");
      }
    } else {
      // set error message
      setError(true);
    }
  }

  let handleNumberChange = (e) => {
    if (e.key == "Backspace") {
      if (numberText.length > 3 && numberText.substring(numberText.length-2, numberText.length-1) == "-") {
        console.log("bye dash")
        setNumberText(numberText.substring(0, numberText.length-2));
        setNumberTextRaw(numberTextRaw.substring(0, numberTextRaw.length-1));
      } else if (numberTextRaw.length > 0) {
        setNumberText(numberText.substring(0, numberText.length-1));
        setNumberTextRaw(numberTextRaw.substring(0, numberTextRaw.length-1));
      }
    } else if ("1234567890".indexOf(e.key) > -1 && numberTextRaw.length < 10) { // is a number
      setNumberText(numberText + (numberTextRaw.length == 3 || numberTextRaw.length == 6 ? "-" : "") + e.key);
      setNumberTextRaw(numberTextRaw + e.key);
    }
  }

  return (
    <div className="module authpage green-2">
        <h2>{ signUp ? "Sign Up" : "Log In"}</h2>
        <input className="module input green-2" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        { signUp ? <input className="module input green-2" type="text" placeholder="phone number" value={numberText} onKeyDown={handleNumberChange}/> : null}
        <input className="module input green-2" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <a className="link-small" href={signUp ? "/login" : "/signup"}>{ signUp ? "Already have an account? Log In!" : "Don't have an account? Sign Up!"}</a>
        { error ? <p className="error">{signUp ? "It seems like you are already registered." : "Invalid credentials."}</p> : null }
        <Button className="module button-1 green-1 shadow-none" type="button" onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

const AuthPage = () => {
  return (
    <PageContainer>
      { window.location.pathname == "/signup"
        ? <AuthComponent signUp={true} />
        : <AuthComponent signUp={false} />
      }
    </PageContainer>
  )
}

export default AuthPage;
