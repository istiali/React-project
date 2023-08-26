import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getAllUsers')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  const handleRoleChange = (userId, newRole) => {
    axios.put('http://localhost:8081/updateUserRole', { userId, newRole })
      .then((res) => {
        setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Admin Panel</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Role</th>
                <th>Edit Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenu${user.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Change Role
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenu${user.id}`}>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleRoleChange(user.id, 'admin')}
                          >
                            Admin
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleRoleChange(user.id, 'developer')}
                          >
                            Developer
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleRoleChange(user.id, 'user')}
                          >
                            User
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
