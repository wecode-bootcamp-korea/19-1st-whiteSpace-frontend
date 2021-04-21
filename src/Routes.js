import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Popup from './Components/Nav/Popup';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import CategoryProduct from './Pages/CategoryProduct/CategoryProduct';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
// import Tos from './Components/Footer/Component/Tos';
// import Footer from './Components/Footer/Footer';
import TopButton from './Components/TopButton/TopButton';
import Order from './Pages/Order/Order';
import OrderComplete from './Pages/Order/Components/OrderComplete/OrderComplete';
import Footer from './Components/Footer/Footer';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/category" component={CategoryProduct} />
          <Route
            exact
            path="/category/:categoryId"
            component={CategoryProduct}
          />
          <Route exact path="/products/:productId" component={ProductDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/products" component={CategoryProduct} />
          <Route exact path="/products/:id" component={CategoryProduct} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/orderComplete" component={OrderComplete} />
        </Switch>
        <TopButton />
        <Footer />
      </Router>
    );
  }
}
