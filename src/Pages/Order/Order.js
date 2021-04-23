import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API } from '../../config';
import OrderInfo from '../Order/Components/OrderInfo/OrderInfo';
import ShippingLocation from '../Order/Components/ShippingLocation/ShippingLocation';
import TotalPrice from '../Order/Components/TotalPrice/TotalPrice';
import PayMethod from '../Order/Components/PayMethod/PayMethod';

class Order extends Component {
  state = {
    name: '',
    phoneNumber: '',
  };

  componentDidMount = () => {
    fetch(`${API}/users/info`, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          name: res.user_info.name,
          phoneNumber: res.user_info.phone_number,
        });
      });
  };

  goToPay = () => {
    const cartId = this.props.location.state.cartId;
    const totalPrice = this.props.location.state.totalPrice;
    const deliveryPrice = this.props.location.state.deliveryPrice;
    const postCode = localStorage.getItem('postCode');
    const mainAddress = localStorage.getItem('mainAddress');
    const detailAddress = localStorage.getItem('detailAddress');
    const { name, phoneNumber } = this.state;
    const cartData = this.props.location.state.cartData;

    let cartItems = [];
    for (let i = 0; i < cartData.length; i++) {
      cartItems.push(cartData[i].product_id);
    }

    fetch(`${API}/cart/order`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        cart_id: cartId,
        total_price: totalPrice + deliveryPrice,
        cart_items: cartItems,
        user_name: name,
        postal_code: postCode,
        main_address: mainAddress,
        detail_address: detailAddress,
        phone_number: phoneNumber,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res['MESSAGE'] === 'SUCCESS') {
          this.props.history.push({
            pathname: '/order/complete',
            state: {
              totalPrice: totalPrice + deliveryPrice,
              name: name,
            },
          });
        }
      });
  };
  render() {
    const { name, phoneNumber } = this.state;
    const totalPrice = this.props.location.state.totalPrice;
    const deliveryPrice = this.props.location.state.deliveryPrice;

    return (
      <>
        <OrderInfo status="ing" />
        <ShippingLocation status="ing" name={name} phoneNumber={phoneNumber} />
        <TotalPrice totalPrice={totalPrice} deliveryPrice={deliveryPrice} />
        <PayMethod goToPay={this.goToPay} />
      </>
    );
  }
}

export default withRouter(Order);
