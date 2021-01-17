import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './js/LandingPage';
import AuthPage from './js/AuthPage';
import VonagePage from './js/Vonage'
import CurrentTaskPage from './js/CurrentTask'
import HallofFamePage from './js/HallofFame'
import HistoryPage from './js/HistoryPage'
import NewTaskPage from './js/NewTask'
import ToDoPage from './js/ToDo'
import SettingsPage from './js/Settings'
import TaskCompletePage from './js/TaskComplete'
import EditTaskPage from './js/EditTask';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.scss';
import FormPage from './js/FormPage';
import ComparisonPage from './js/ComparisonPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={AuthPage} /> 
        <Route path="/login" component={AuthPage} />
        <Route path="/vonage" component={VonagePage} />
        <Route path="/currenttask" component={CurrentTaskPage} />
        <Route path="/halloffame" component={HallofFamePage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/newtask" component={NewTaskPage} />
        <Route path="/todo/edit/:taskId" component={EditTaskPage} />
        <Route path="/todo/complete/:taskId" component={TaskCompletePage} />
        <Route path="/todo/fail/:taskId" component={TaskCompletePage} />
        <Route path="/todo/:taskId" component={CurrentTaskPage} />
        <Route path="/todo" component={ToDoPage} />        
        <Route path="/settings" component={SettingsPage} />
        <Route path="/form" component={FormPage} />
        <Route path="/comparison/:comparisonId" component={ComparisonPage} />
        <Route path="/comparison" component={ComparisonPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
