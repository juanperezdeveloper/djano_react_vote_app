import React from 'react';
import { Navbar } from '../Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AdminPage } from '../AdminPage';
import { Alert } from '../_components/Alert';
import { Shopdatas } from '../shopdatas';
import { DashPage } from '../DashPage';
// import NotFound from './notFound';

function HomePage() {
  const { pathname } = useLocation();  

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Alert />
        <div className="container mt-5">
          <div className="row">
            <div className="data-table-shop">
              <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <Route path="/" exact component={DashPage} />
                <Route path="/adminuser" component={AdminPage} />
                <Route path="/shopdata" component={Shopdatas} />
                <Redirect from="*" to="/" />

              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export { HomePage };
