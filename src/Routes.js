import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Welcome from './Pages/Signup/Welcome/Welcome';
import CategoryProduct from './Pages/CategoryProduct/CategoryProduct';
import ProductDetail from './Pages/ProductDetail/ProductDetail';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/products" component={CategoryProduct} />
          <Route exact path="/review" component={ProductDetail} />
        </Switch>
      </Router>
    );
  }
}
