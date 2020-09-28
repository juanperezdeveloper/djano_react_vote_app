import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector(state => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (user.firstName && user.lastName && user.username && user.password) {
      dispatch(userActions.register(user));
    }
  }

  return (
    <div className="auth">
      <h1>Shop Vote</h1>
      <div className="card">
        <div className="card-body">
          <form name="form" onSubmit={handleSubmit}>
            <p className="h4 text-center py-4">Register</p>
            <div className="md-form">
              <i className="fa fa-pencil-alt prefix grey-text"></i>
              <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} placeholder="First Name" />
              {submitted && !user.firstName &&
                <div className="invalid-feedback">FirstName is required</div>
              }
            </div>
            <div className="md-form">
              <i className="fa fa-pencil-alt prefix grey-text"></i>
              <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} placeholder="Last Name" />
              {submitted && !user.lastName &&
                <div className="invalid-feedback">LastName is required</div>
              }
            </div>
            <div className="md-form">
              <i className="fa fa-user prefix grey-text"></i>
              <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} placeholder="Your name" />
              {submitted && !user.username &&
                <div className="invalid-feedback">Username is required</div>
              }
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix grey-text"></i>
              <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} placeholder="Password" />
              {submitted && !user.password &&
                <div className="invalid-feedback">Password is required</div>
              }
            </div>
            <div className="row d-flex align-items-center mb-4">

              <div className="col-md-1 col-md-5 d-flex align-items-start">
                <div className="text-center">
                  <button type="submit" className="btn btn-grey btn-rounded z-depth-1a">Register</button>
                </div>
              </div>

              <div className="col-md-7">
                <p className="font-small grey-text d-flex justify-content-end mt-3">Did you already register? <a href="/login"
                  className="dark-grey-text ml-1 font-weight-bold">Cancel</a></p>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

export { RegisterPage };