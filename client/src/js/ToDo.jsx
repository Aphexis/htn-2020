import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button } from 'react-bootstrap';
import '../css/PageContainer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './ToDoList'

const ToDoComponent = () => {
  let history = useHistory();
  const [tasks, setTasks] = useState([
    // {
    //   id: 0, 
    //   name: "Submit Hack to Devpost",
    //   time: "33:43:06"
    // },
    // {
    //   id: 1, 
    //   name: "Finish CS Assignment 1",
    //   time: "48:43:06"
    // },
    // {
    //   id: 2, 
    //   name: "Finish Math Assignment 1",
    //   time: "75:43:06"
    // },
    // {
    //   id: 3, 
    //   name: "Complete Statistics Quiz",
    //   time: "168:43:06"
    // }
  ]);

  useEffect(() => {
    const getList = async () => {
      console.log('doing fetch');
      fetch('/api/tasks/active')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTasks(data);
      });
    }

    console.log('getting list');
    getList();
  }, []);

  return (
    <div className="module todo green-2">
      <h2 className="title">To-Do List</h2>
      <div className="line">
        <a className="task-l">Task</a>
        <a className="task-r">Due on...</a>
      </div>
      <TodoList tasks={tasks}/>
      <div className="line">
      </div>
      <div className="button-div2">
        <Button type="link" className="module green-1 button-1" onClick={() => history.push("newtask")}>Add New Task</Button>
        <Button type="link" className="module green-1 button-1" onClick={() => history.push("halloffame")}>Hall of Fame</Button>
        <Button type="link" className="module green-1 button-1" onClick={() => history.push("settings")}>Settings</Button>
      </div>
    </div>
  )
}
const ToDoPage = () => {
  return (
    <PageContainer className="FormPage">
      <ToDoComponent />
    </PageContainer>
  )
}

export default ToDoPage;
