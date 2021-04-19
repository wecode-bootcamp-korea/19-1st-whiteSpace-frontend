import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Nav from './Components/Nav/Nav';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Main from './Pages/Main/Main';
import Signup from './Pages/Signup/Signup';
import Tos from './Components/Footer/Component/Tos';
import Footer from './Components/Footer/Footer';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {/* <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/products" component={CategoryProduct} /> */}
          <Route exact path="/review" component={ProductDetail} />
        </Switch>
      </Router>
    );
  }
}
