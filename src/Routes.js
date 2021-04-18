import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import CategoryProduct from './Pages/CategoryProduct/CategoryProduct';
import Signup from './Pages/Signup/Signup';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
<<<<<<< HEAD
          <Route exact path="/" component={Main} />
=======
          {/* <Route exact path="/" component={ProductDetail} /> */}
>>>>>>> aafe236a9b853f31a40d5ace809e2432165da7b3

          <Route exact path="/login" component={Login} />

          {/* <Route exact path="/signup" component={Signup} /> */}
        </Switch>
      </Router>
    );
  }
}
