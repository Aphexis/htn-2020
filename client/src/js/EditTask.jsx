import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { useHistory } from 'react-router-dom';


const EditTaskComponent = () => {
  const [ taskname, setTaskname ] = useState("");  
  const [ completeTime, setCompleteTime ] = useState("");
  const [ friends, setFriends ] = useState([]);
  const [ friend, setFriend ] = useState(0);
  const [ hardMode, setHardMode ] = useState(false);
  let history = useHistory();
  let {taskId} = useParams();

  useEffect(() => {
    const getFriends = async () => {
      const resp = await fetch(`/api/friends`);
      const friends = await resp.json();
      console.log(friends);
      setFriends(friends);
    }

    const getTask = async(id) => {
        const resp = await fetch(`/api/tasks/one/${id}`);
      const task = await resp.json();
      console.log(task);
      setTaskname(task.name);
      const date = new Date(task.deadline);
      setCompleteTime(date);
      setFriend(task.friend);
    }
    getFriends();
    getTask(taskId);
  }, [])

  let handleSubmit = async () => {
    console.log(`${taskname} ${completeTime} ${friend} ${hardMode}`);
    // create a new task
    let pass = true;
    // check if this is a valid task?
    const response = await fetch(`/api/tasks/edit/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: taskname, deadline: completeTime, friendId: friend}),
    });
    console.log(response);
    if (pass) {
      // maybe post here? maybe before
      history.push(`/todo/${taskId}`);
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
          {friend > 0 && <select className="module input grey" id="friend" name="friend" onChange={(e) => setFriend(e.target.value)}>
            {friends.map((f) => ( f.id == friend ?
                <option value={f.id} selected>{f.name}</option>
                :
                <option value={f.id}>{f.name}</option>
            ))}
            {/* {friends.map((f) => (
                    return <option value={f.id} selected="selected"}>{f.name}</option>)} */}
          </select>}
          {/* <input className="module input grey" type="text" value={friend} onChange={(e) => setFriend(e.target.value)}/> */}
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
const EditTaskPage = () => {
  return (
    <PageContainer>
      <EditTaskComponent />
    </PageContainer>
  )
}

export default EditTaskPage;
