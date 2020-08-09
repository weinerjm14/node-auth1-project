import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/AxiosBase';

export function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get('/users')
      .then(res => {
        console.log('users page', res);
        setUsers(res.data);
      })
      .catch(err => console.log('error getting data:', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <section className="userslist">
        {users ? (
          users.map(user => {
            return (
              <section className="user" key={user.id}>
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
