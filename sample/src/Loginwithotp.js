import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { getAuth } from 'firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import {auth} from './firebase';

function Loginwithotp() {
  const [values, setValues] = useState({
    number: '',
    otp: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const configureCaptcha = () => {
    // Configure reCAPTCHA
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    }, auth);
  };

  const onSignInSubmit = (event) => {
    event.preventDefault();
    auth.settings.appVerificationDisabledForTesting = true;
    configureCaptcha();
    
    const phoneNumber = '+919833355460';
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log('OTP has been sent');
        window.recaptchaVerifier.reset();
      })
      .catch((error) => {
        console.log('Error sending SMS:', error);
      });
  };

  const onSubmitOTP = (event) => {
    event.preventDefault();
    const code = values.otp;
    console.log(code);
    window.confirmationResult.confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        alert('User is verified');
      })
      .catch((error) => {
        console.log('Error verifying OTP:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <h2>Login Page</h2>
          </div>
          <form onSubmit={onSignInSubmit} className="border p-4 rounded shadow">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your phone number"
                name="number"
                minLength={10}
                maxLength={12}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-success">
                Send Otp
              </button>
            </div>

            </form>

            <form onSubmit={onSubmitOTP} className="border p-4 rounded shadow">


            <div className="mb-3">
              <label htmlFor="inputPassword6" className="form-label">
                One Time Password
              </label>
              <input
                type="tel"
                id="inputPassword6"
                className="form-control"
                aria-describedby="passwordHelpInline"
                name="otp"
                size={6}
                minLength={4}
                maxLength={6}
                onChange={handleChange}
                required
              />
              
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>
            </form>
            <div className="mb-3 text-center">
              <label className="form-label">
                If you want to login with OTP, click below:
              </label>
            </div>
            <div className="mb-3 text-center">
              <Link to="/" className="btn btn-success">
                Login with password
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
          
        </div>
      </div>
    </div>
  );
}

export default Loginwithotp;
