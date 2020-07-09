import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import './App.css';
// import axios from 'axios';

import { Login } from './components/login';
import { UserList } from './components/users';
import { Register } from './components/register';

function App(props) {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.reload(false);
  };
  return (
    <section className="App">
      <section className="full-container">
        <Router>
          <div className="nav">
            <Link to="/login">Login</Link>

            <Link to="/users">User List</Link>

            <Link to="/register">Register</Link>
            <button className="lobutton" onClick={logout}>
              Log Out
            </button>
          </div>
          <div className="routes">
            <Switch>
              <PrivateRoute path="/users" component={UserList} />

              <Route path="/login" component={Login} />
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </section>
    </section>
  );
}

export default App;
