import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Submitting:", values);

    axios
      .post('http://localhost:8081/login', values)
      .then((res) => {
        console.log("Response:", res.data);
        if (res.data === "Success") {
          navigate('/home');
        }
        else if (res.data === "Admin") {
          navigate('/admin');
        }
        else {
          alert('No record existed');
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <h2>Login Page</h2>
          </div>
          <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword6" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="inputPassword6"
                className="form-control"
                aria-describedby="passwordHelpInline"
                name="password"
                onChange={handleChange}
                required
              />
              <div className="form-text">
                Must be 8-20 characters long.
              </div>
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>
            <hr/>
            <div className="mb-3 text-center">
              <label className="form-label">
                If you haven't registered yet, click below to register:
              </label>
            </div>
            <div className="mb-3 text-center">
              <Link to="/register" className="btn btn-success">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
