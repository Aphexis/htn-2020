import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button, Form, Link, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const SettingsComponent = () => {
  let history = useHistory();
  const [ fshow, setFshow ] = useState(false);
  const [ fname, setFname ] = useState("");
  const [ errorTextf, setErrorTextf ] = useState(false); 
  const [ numberText, setNumberText ] = useState("");
  const [ numberTextRaw, setNumberTextRaw ] = useState("");
  const [ mshow, setMshow ] = useState(false);
  const [ pshow, setPshow ] = useState(false);
  const [ m, setM ] = useState("");
  const [pic, setPic] = useState();

  // fetch list of friends here as array? sorry not sure exactly what format this is
  let friends = [
    { id: 1, name: "Stephanie", phone: "1234567890", userId: 420},
    { id: 2, name: "Julia", phone: "4321586790", userId: 96},
    { id: 3, name: "Wen", phone: "0987654321", userId: 10},
  ]

  let messages = [ // fetched
    "u suck",
    "youre bad",
    "baaaaaad"
  ]

  // useEffect(() => {
  //   setMArray(messages);
  // }, [messages])

  let processNumber = (number) => {
    return number.substring(0, 3) + "-" + number.substring(3, 6) + "-" + number.slice(6);
  }

  let handleSubmit = () => {
    console.log(`${fname} ${numberTextRaw}`);

    let pass = true;
    // check if user exists? idk lol
    if (pass) {
      // add to friends list, rerender the component underneath
      setFshow(false);
    } else {
      setErrorTextf(true);
    }

  }

  let addMessage = () => {
    console.log(messages);
    console.log(m);
    setMshow(false);
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

  let onChangeHandler = (e) => {
    console.log(e.target.files[0])
    setPic(e.target.files[0]);
  }

  let uploadPic = () => {
    const data = new FormData();
    data.append('file', pic);
    axios.post("/upload", data, {

    }).then(res => {
      console.log(res.statusText);
    })
    setPshow(false);
  }

  return (
    <div className="module authpage green-2">
        <h3 className="title">Configure Settings</h3>
        <div className="list">
          <span className="list-row">
            <label className="text float-left">Friends List</label>
            <Button variant="link" className="invis text float-right task-r shadow-none" onClick={() => setFshow(true)}>Add Friend</Button>
          </span>
          <Modal show={fshow} onHide={() => setFshow(false)} className="module green-2">
            <Modal.Header closeButton>
              <Modal.Title>Add a Friend!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="input-group">
                <label className="text input-label">Name</label>
                <input className="module input grey" type="text" value={fname} onChange={(e) => setFname(e.target.value)}/>
              </div>
              <div className="input-group">
                <label className="text input-label">Phone Number</label>
                <input className="module input grey" type="text" placeholder="###-###-####" value={numberText} onKeyDown={handleNumberChange}/>
              </div>
              { errorTextf ? <p className="error">Friend not found :(</p> : null}
              <Button type="button" className="module button-1 green-1 shadow-none" onClick={handleSubmit}>Add Friend</Button>
            </Modal.Body>
          </Modal>
          <div className="module grey">
            {friends.map((friend) => {
              return (
              <span className="list-row">
                <label className="text float-left">{friend.name}</label>
                <label className="text float-right">{processNumber(friend.phone)}</label>
              </span>
            )})}
          </div>
        </div>
        <div className="list">
          <span className="list-row">
            <label className="text float-left">Punishment Settings</label>
          </span>
          
          <div className="module grey">
            {/* messages */}
            <span className="list-row">
              <label className="text float-left">Messages</label>
              <Button variant="link" className="invis text float-right task-r shadow-none" onClick={() => setMshow(true)}>Manage</Button>
            </span>
            <Modal show={mshow} onHide={() => setMshow(false)} className="module green-2">
              <Modal.Header closeButton>
                <Modal.Title>Manage Messages</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="input-group">
                  <label className="text input-label">Your Messages</label>
                  <div className="module grey list-messages">
                    {messages.map((message) => {
                      return (
                      <span className="list-row">
                        <p className="text float-left">{message}</p>
                      </span>
                    )})}
                  </div>
                </div>
                <div className="input-group">
                  <label className="text input-label">Add Message</label>
                  <input className="module input grey" type="text" value={m} onChange={(e) => setM(e.target.value)}/>
                </div>
                <Button type="button" className="module button-1 green-1 shadow-none" onClick={addMessage}>Add Message</Button>
              </Modal.Body>
            </Modal>
            
            {/* pictures */}
            <span className="list-row">
              <label className="text float-left">Pictures</label>
              <Button variant="link" className="invis text float-right task-r shadow-none" onClick={() => setPshow(true)}>Manage</Button>
            </span>
            <Modal show={pshow} onHide={() => setPshow(false)} className="module green-2">
              <Modal.Header closeButton>
                <Modal.Title>Manage Pictures</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="input-group">

                </div>
                <form method="post" enctype="multipart/form-data" action="/upload">
                  <input type="file" name="file" onChange={onChangeHandler}/>
                  <Button type="button" className="module green-1 button-1 shadow-none" onClick={uploadPic}>Upload</Button>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <div className="right-align">
          <Button className="module green-1 button-1 shadow-none" type="button" onClick={() => history.push("/todo")}>Exit</Button>
        </div>
    </div>
  )
}
const SettingsPage = () => {
  return (
    <PageContainer>
      <SettingsComponent />
    </PageContainer>
  )
}

export default SettingsPage;
