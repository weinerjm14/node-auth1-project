import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/AxiosBase';

export function Register(props) {
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
  async function register(e) {
    try {
      e.preventDefault();
      console.log(creds);
      const response = await axios()
        .post('http://localhost:5000/api/users', creds)
        .then(res => {
          console.log('register', res);
          props.history.push('/login');
        })
        .catch(err => {
          console.log('res Err is: ', err);
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="loginForm">
      <form onSubmit={register}>
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
        <button type="submit">Register</button>
      </form>
    </section>
  );
}
