import React from 'react'
import { Button } from 'react-bootstrap';
import '../css/PageContainer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ToDoList( { tasks }) {
    const colors = ["task red", "task orange", "task yellow", "task green-1"];
    return (
        tasks.map(task => {
            return (
                <div className={colors[task.id % 4]}>
                    <a className="task-l">{task.name}</a>
                    <a className="task-r">{task.time}</a>
                </div>
            )
        })
    )
}
