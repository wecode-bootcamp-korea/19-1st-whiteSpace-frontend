import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
// import ProductDetail from './Pages/ProductDetail';
import Welcome from './Pages/Signup/Welcome/Welcome';
import Nav from './Components/Nav/Nav';
import OrderComplete from './Pages/Order/Components/OrderComplete/OrderComplete';
// import Main from './Pages/Main/Main';
// import CategoryProduct from './Pages/CategoryProduct/CategoryProduct';
// import Signup from './Pages/Signup/Signup';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          {/* <Route exact path="/" component={ProductDetail} /> */}

          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/order" component={OrderComplete} />

          {/* <Route exact path="/signup" component={Signup} /> */}
        </Switch>
      </Router>
    );
  }
}
