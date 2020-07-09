import React, { useState } from 'react';
import axios from 'axios';

import { axiosWithAuth } from '../utils/AxiosBase';

export function Login(props) {
  const [creds, setCreds] = useState({
    username: '',
    password: '',
  });
  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };
  const login = e => {
    e.preventDefault();
    console.log(creds);
    axios
      .post('http://localhost:5000/api/login', creds)
      .then(res => {
        console.log('login', res);
        // localStorage.setItem('token', res.data.payload);
        props.history.push('/users');
      })
      .catch(err => {
        console.log('Err is: ', err);
      });
  };
  return (
    <section className="loginForm">
      <form onSubmit={login}>
        <label>User Name:</label>
        <input
          type="text"
          name="username"
          value={creds.username}
          onChange={handleChange}
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={creds.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
    </section>
  );
}
