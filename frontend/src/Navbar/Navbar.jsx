import React from 'react';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color shop-navbar">
      <div className="container">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li>
              <NavLink to="/adminuser" className="nav-item nav-link">Admin User</NavLink>
            </li>
            <li>
              <NavLink to="/shopdata" className="nav-item nav-link">Shop Data</NavLink>
            </li>
            <li className="btn-log">
              <a href="/login"><i className="fa fa-lock prefix white-text"> -Log Out</i></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export { Navbar };