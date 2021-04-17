import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Login from './Pages/Login/Login';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Review from './Pages/ProductDetail/Components/Review/Review';
// import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import CategoryProduct from './Pages/CategoryProduct/CategoryProduct';
// import Signup from './Pages/Signup/Signup';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Review} /> */}
          <Route exact path="/" component={Main} />
          <Route exact path="/products" component={CategoryProduct} />
          <Route exact path="/review" component={ProductDetail} />

          {/* 
          <Route exact path="/login" component={Login} />


          <Route exact path="/signup" component={Signup} /> */}
        </Switch>
      </Router>
    );
  }
}
