import { useState } from "react";
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import validation from "./Validation";


function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    number: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, seterror] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    seterror(validation(values));
    if(errors.password === ""){

    axios.post('http://localhost:8081/register', values)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log("error");
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <h2>Registration Page</h2>
          </div>
          <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                name='name'
                value={values.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                name='email'
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="number"
                placeholder="Enter your phone number"
                name='number'
                minLength={10}
                maxLength={10}
                value={values.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter a password"
                name='password'
                value={values.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className='text-danger'> {errors.password} </span>}
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <hr/>
            <div className="mb-3 text-center">
              <label className="form-label">
                If you are already registered, click below to login:
              </label>
            </div>
            <div className="mb-3 text-center">
              <Link to="/" className="btn btn-success">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
