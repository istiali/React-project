import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validation from './Validation';
import {Button} from 'antd';
import {LoginOutlined} from '@ant-design/icons';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, seterror] = useState({});
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
    seterror(validation(values));
    if(errors.password === ""){

    

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
    }
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <h2>Login Page</h2>
          </div>
          <form  className="border p-4 rounded shadow">
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
              {errors.password && <span className='text-danger'> {errors.password} </span>}
              <div className="form-text">
                Must be 8-20 characters long.
              </div>
            </div>
            <div className="mb-3 text-center">
              <Button type="primary" icon= <LoginOutlined /> onClick={handleSubmit}>
                Login
              </Button>
            </div>
            <div className="mb-3 text-center">
              <label className="form-label">
                If you want to login with OTP, click below:
              </label>
            </div>
            <div className="mb-3 text-center">
              <Link to="/otp" className="btn btn-success">
                Login with Otp
              </Link>
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
