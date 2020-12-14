import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Components/Login";
import Register from "./Components/Register";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Point Of Sales</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <Nav.Link href="/login">Sign In</Nav.Link>
              <Nav.Link eventKey={2} href="/register">
                SignUp
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;