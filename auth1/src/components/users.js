import React, { useState, useEffect } from 'react';
// import { axiosWithAuth } from '../utils/AxiosBase';
import axios from 'axios';

export function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        console.log('users page', res);
        setUsers(res.data);
      })
      .catch(err => console.log('error getting data:', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <section className="flcontainer">
        {users ? (
          users.map(user => {
            return (
              <section className="friend" key={user.id}>
                <h3>{user.username}</h3>
              </section>
            );
          })
        ) : (
          <h2>Finding Users</h2>
        )}
      </section>
    </div>
  );
}
