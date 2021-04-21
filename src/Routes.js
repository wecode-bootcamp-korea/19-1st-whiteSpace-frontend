import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Login from './Pages/Login/Login';
// import Main from './Pages/Main/Main';
// import Signup from './Pages/Signup/Signup';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/products/:productId" component={ProductDetail} />
          {/* <Route exact path="/productdetail" component={ProductDetail} /> */}
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/order" component={Order} />
          {/* <Route exact path="/" component={Main} />


          <Route exact path="/login" component={Login} />


          <Route exact path="/signup" component={Signup} /> */}
        </Switch>
      </Router>
    );
  }
}
