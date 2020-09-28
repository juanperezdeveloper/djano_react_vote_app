import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  return (
    <div className="auth">
      <h1>Shop Vote</h1>
      <div className="card">
        <div className="card-body">
          <form name="form" onSubmit={handleSubmit}>
            <p className="h4 text-center py-4">LOG IN</p>
            <div className="md-form">
              <i className="fa fa-user prefix grey-text"></i>
              <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} placeholder="Your name" />
              {submitted && !username &&
                <div className="invalid-feedback">Username is required</div>
              }
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix grey-text"></i>
              <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} placeholder="Password" />
              {submitted && !password &&
                <div className="invalid-feedback">Password is required</div>
              }
            </div>
            <div className="row d-flex align-items-center mb-4">

              <div className="col-md-1 col-md-5 d-flex align-items-start">
                <div className="text-center">
                  <button type="submit" className="btn btn-grey btn-rounded z-depth-1a">Log in</button>
                </div>
              </div>

              <div className="col-md-7">
                <p className="font-small grey-text d-flex justify-content-end mt-3">Don't have an account? <a href="/register"
                  className="dark-grey-text ml-1 font-weight-bold"> Sign up</a></p>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

export { LoginPage };