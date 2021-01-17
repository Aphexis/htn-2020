import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';


const NewTaskComponent = () => {
  const [ taskname, setTaskname ] = useState("");  
  const [ completeTime, setCompleteTime ] = useState("");
  const [ friend, setFriend ] = useState("");
  const [ hardMode, setHardMode ] = useState(false);
  let history = useHistory();

  let handleSubmit = () => {
    console.log(`${taskname} ${completeTime} ${friend} ${hardMode}`);
    // create a new task
    let pass = true;
    // check if this is a valid task?
    if (pass) {
      // maybe post here? maybe before
      history.push("/todo");
    }
  }


  return (
    <div className="module todo green-2">
        <div>
          <h3 className="input-group">New Task</h3>
        </div>
        <div className="input-group">
          <label className="text input-label">Task Name</label>
          <input className="module input grey" type="text" value={taskname} onChange={(e) => setTaskname(e.target.value)}/>
        </div>
        <div className="input-group">
          <label className="text input-label">Complete By</label>
          <input className="module input grey" type="datetime-local" value={completeTime} onChange={(e) => setCompleteTime(e.target.value)}/>
        </div>
        <div className="input-group">
          <label className="text input-label">Assign to friend</label>
          <input className="module input grey" type="text" value={friend} onChange={(e) => setFriend(e.target.value)}/>
        </div>
        <span className="text input-label">Hard Mode?
          <label class="switch">
            <input type="checkbox" checked={hardMode} onClick={(e) => setHardMode(!hardMode)} />
            <span class="slider round shadow-none"></span>
          </label>
        </span>
        <div className="button-div">
          <Button className="module green-1 button-1 shadow-none" type="button" onClick={handleSubmit}>Submit</Button>
          <Button className="module red button-3 shadow-none" type="button" onClick={() => history.push("/todo")}>Cancel</Button>
        </div>
    </div>
  );
}
const NewTaskPage = () => {
  return (
    <PageContainer>
      <NewTaskComponent />
    </PageContainer>
  )
}

export default NewTaskPage;
