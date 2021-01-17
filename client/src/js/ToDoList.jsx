import React from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../css/PageContainer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ToDoList( { tasks }) {
  const renderTime = (deadline) => {
    const date = new Date(deadline);
    return date.toLocaleString();
  };

    let history = useHistory();
    const colors = ["task red", "task orange", "task yellow", "task green-1"];
    return (
        tasks.map((task, index) => {
            return (
                <div className={colors[index % 4]} onClick={() => history.push(`/todo/${task.id}`)}>
                    <span className="task-l">{task.name}</span>
                    <span className="task-r">{renderTime(task.deadline)}</span>
                </div>
            )
        })
    )
}
