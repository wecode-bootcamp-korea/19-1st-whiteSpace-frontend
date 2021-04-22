import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Popup from './Components/Nav/Popup';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Welcome from './Pages/Signup/Welcome/Welcome';
import CategoryProduct from './Pages/CategoryProduct/CategoryProduct';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Popup />
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/category" component={CategoryProduct} />
          <Route exact path="/category/:id" component={CategoryProduct} />
          <Route exact path="/products/:productId" component={ProductDetail} />
        </Switch>
      </Router>
    );
  }
}
