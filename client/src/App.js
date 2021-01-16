import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './js/LandingPage';
import AuthPage from './js/AuthPage';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.scss';

const App = () => {
  // document.title = 'Recipe Comparer';
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/signup" render={(props) => <AuthPage {...props} isSignUp={true}/>} />
          <Route path="/login" render={(props) => <AuthPage {...props} isSignUp={false}/>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

/*
const App = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    const getList = () => {
      fetch('/api/getList')
      .then(res => res.json())
      .then(list => setList(list))
    }

    getList();
    // console.log(list);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          Here's something cool: {list}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
