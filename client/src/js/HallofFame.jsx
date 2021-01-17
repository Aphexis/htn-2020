import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PageContainer from './PageContainer';
import { Button } from 'react-bootstrap';
import '../css/PageContainer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';

const HallofFame = ( { tasks, color }) => {
  return (
    tasks.map(task => {
      return (
        <div className={color}>
          <a className="task-l">{task.name}</a>
        </div>
      )
    })
  )
}

const HallofFameComponent = () => {
  const location = useLocation();
  let history = useHistory();
  const [alltasks, setAllTasks] = useState([
    {
      id: 1,
      name: "my task",
      status: "failed"
    },
    {
      id: 2,
      name: "my task 2",
      status: "completed"
    },
    {
      id: 3,
      name: "my task 3",
      status: "failed"
    },
    {
      id: 4,
      name: "my task 4",
      status: "completed"
    }
  ]);
  const [tasks, setTasks] = useState([]) //must initialize value
  const [color, setColor] = useState([])

  function toggleTasks(isHall) {
    if (isHall) {
      setTasks(alltasks.filter(task => task.status === "completed"))
      setColor("task green-1")
    } else {
      setTasks(alltasks.filter(task => task.status === "failed"))
      setColor("task red")
    }
  }

  return (
    <div className="module todo green-2">
      <div className="line">
        <Button type="button" className="module task-l green-1 button-1" onClick={() => {toggleTasks(true)}}>Hall of Fame</Button>
        <Button type="button" className="module task-r red button-3" onClick={() => {toggleTasks(false)}}>Wall of Shame</Button>
      </div>
      <HallofFame tasks={tasks} color={color} />
      <div>
        <Button type="button" className="task-r module green-1 button-1" onClick={() => history.push("todo")}>Exit</Button>
      </div>
    </div>
  )
}
const HallofFamePage = () => {
  return (
    <PageContainer className="FormPage">
      <HallofFameComponent />
    </PageContainer>
  )
}

export default HallofFamePage;