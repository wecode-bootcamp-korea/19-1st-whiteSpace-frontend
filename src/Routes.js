import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Nav from './Components/Nav/Nav';
import CategoryProduct from './Pages/CategoryProduct/CategoryProduct';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Main from './Pages/Main/Main';
import Signup from './Pages/Signup/Signup';
<<<<<<< HEAD
=======
// import Tos from './Components/Footer/Component/Tos';
// import Footer from './Components/Footer/Footer';
import TopButton from './Components/TopButton/TopButton';
import Popup from './Components/Nav/Popup';
>>>>>>> master
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
        </Switch>
        <TopButton />
        <Footer />
      </Router>
    );
  }
}
