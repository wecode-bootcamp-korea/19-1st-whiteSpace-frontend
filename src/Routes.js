import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Nav from './Components/Nav/Nav';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Main from './Pages/Main/Main';
import Signup from './Pages/Signup/Signup';
import Footer from './Components/Footer/Footer';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';

import InfomationWrap from './Components/InfomationWrap/InfomationWrap';
import Paging from './Components/Paging/Paging';
import ProductWrap from './Components/ProductWrap/ProductWrap';

import OrderComplete from './Pages/Order/Components/OrderComplete/OrderComplete';
import OrderInfo from './Pages/Order/Components/OrderInfo/OrderInfo';
import PayInfo from './Pages/Order/Components/PayInfo/PayInfo';
import ShippingLocation from './Pages/Order/Components/ShippingLocation/ShippingLocation';
import TableWrap from './Pages/Order/Components/TableWrap/TableWrap';
import TotalPrice from './Pages/Order/Components/TotalPrice/TotalPrice';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Cart} />
          <Route exact path="/products" component={ProductDetail} />

          <Route exact path="/oc" component={OrderComplete} />
          <Route exact path="/oi" component={OrderInfo} />
          <Route exact path="/pi" component={PayInfo} />
          <Route exact path="/sl" component={ShippingLocation} />
          <Route exact path="/tw" component={TableWrap} />
          <Route exact path="/tp" component={TotalPrice} />
          <Route exact path="/o" component={Order} />
          {/* 
          <Route exact path="/login" component={Login} />
        */}
          <Route exact path="/iw" component={InfomationWrap} />
          <Route exact path="/p" component={Paging} />
          <Route exact path="/pw" component={ProductWrap} />

          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    );
  }
}
