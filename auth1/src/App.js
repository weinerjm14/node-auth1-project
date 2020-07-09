import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import PrivateRoute from './components/privateRoute';
import './App.css';

import { Login } from './components/login';
import { UserList } from './components/users';
import { Register } from './components/register';

function App() {
  return (
    <section className="App">
      <Router>
        <div className="nav">
          <Link to="/login">Login</Link>

          <Link to="/users">User List</Link>

          <Link to="/register">Register</Link>
          {/* <button onClick={logout}>Log Out</button> */}
        </div>
        <div className="routes">
          <Switch>
            <Route exact path="/users" component={UserList} />

            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </section>
  );
}

export default App;
