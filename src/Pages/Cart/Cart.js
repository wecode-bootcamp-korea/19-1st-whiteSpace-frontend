import React, { Component } from 'react';
import Nav from '../../Components/Nav/Nav';
import TableWrap from '../Order/Components/TableWrap/TableWrap';
import './Cart.scss';

const num = 2;

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      quantity: 0,
      totalPrice: 0,
      deliveryPrice: 0,
    };
  }

  getBackDataCart = () => {
    fetch('data/cartData.json')
      // fetch('http://10.58.2.3:8000/cart', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: localStorage.getItem('access_token'),
      //   },
      // })
      .then(res => res.json())
      .then(data => {
        if (data.cart.length > 0) {
          const addCartArr = [];

          data.cart.map(cartData =>
            addCartArr.push({
              isSelect: false,
              ...cartData,
            })
          );

          this.setState({
            cartData: addCartArr,
            deliveryPrice: 2500,
          });
        }
      });
  };

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  componentDidMount() {
    // fetch('http://10.58.7.33:8000/cart')
    // fetch('data/cartData.json')
    this.getBackDataCart();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleDelete = index => {
    const dataArr = this.state.cartData;

    const deleteDataArr = dataArr[index].order_product_id;
    // console.log(deleteDataArr);

    // DELETE 10.58.7.33:8000/cart/item_id=2,5,8

    fetch(`http://10.58.2.3:8000/cart?item_id=${deleteDataArr}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res) // or res.json()
      .then(res => {
        console.log(res.MESSAGE);
        this.getBackDataCart();
      });
  };

  handelQuantity = (changeNum, index) => {
    if (changeNum === -1 && this.state.cartData[index].quantity <= 0) {
      return;
    }

    const changeId = this.state.cartData[index].order_product_id;
    // console.log('fetch - index : ' + index);
    console.log(changeNum);

    fetch(`http://10.58.2.3:8000/cart/${changeId}`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        quantity: Number(changeNum),
      }),
    })
      .then(res => res) // or res.json()
      .then(res => {
        // console.log(res);
        // console.log(res.MESSAGE);
        this.getBackDataCart();
      });
  };

  priceComma = price => {
    const won = Math.floor(price);
    // this.setState({
    //   totalPrice: this.state.totalPrice + won,
    // });

    return won.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  changeQuantity = (e, index) => {
    const { cartData } = this.state;

    const sendQuantity = cartData[index].quantity;

    // fetch(`10.58.7.33:8000/cart/${}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       cartData: data.cart,
    //     });
    //   });

    // if ()
    // this.state.cartData[index].quantity !==
  };

  totalPriceResult = () => {
    /* {priceComma(cart.default_price * cart.quantity) + '원'} */
    const { cartData } = this.state;

    let sumPrice = 0;
    for (let i = 0; i < cartData.length; i++) {
      sumPrice = sumPrice + cartData[i].default_price * cartData[i].quantity;
    }

    // this.state.totalPrice = sumPrice;

    // sumPrice = this.priceComma(sumPrice);
    return Number(sumPrice);

    // const { cartData } = this.state;
    // console.log(cartData);
    // let totalPrice = 0;

    // for (let i of cartData) {
    //   totalPrice = totalPrice + i.default_price * i.quantity;
    // }

    // console.log(totalPrice);
    // return totalPrice;
  };

  quantityOnChange = (e, index) => {
    console.log(e);
    console.log(index);
    const beforeNum = this.state.cartData[index].quantity;
    console.log(beforeNum);
    const newNum = Number(e.target.Value);

    const postNum =
      beforeNum > newNum ? -(newNum - beforeNum) : newNum - beforeNum;

    this.handelQuantity(postNum, index);
  };

  render() {
    const { cartData, quantity, totalPrice, deliveryPrice } = this.state;
    const {
      priceComma,
      totalPriceResult,
      handleDelete,
      handelQuantity,
      quantityOnChange,
    } = this;
    const title =
      '일반상품' + (cartData.length > 0 ? ' (' + cartData.length + ')' : '');
    let sumPrice = 0;
    return (
      <>
        <Nav />
        <div id="Cart">
          <div>
            <h1>SHOPPING CART</h1>
            <TableWrap title={title}>
              <table className="cartTable">
                <thead>
                  <tr>
                    <th className="tableCheckBoxWidth">
                      <input type="checkbox" />
                    </th>
                    <th className="tableImgWidth">이미지</th>
                    <th>상품정보</th>
                    <th>판매가</th>
                    <th>수량</th>
                    <th>배송비</th>
                    <th>합계</th>
                    <th>선택</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((cart, index) => (
                    <tr key={cart.order_product_id}>
                      <td className="tbodyCheckBoxLine">
                        <input type="checkbox" />
                      </td>
                      <td className="tbodyImgLine">
                        <img
                          src={cart.thumbnail_image}
                          alt={cart.product_name}
                        />
                      </td>
                      <td className="tbodyProductLine">
                        <div>{cart.name}</div>
                        {cart.bundle_name !== null && (
                          <div className="bundleName">[{cart.bundle_name}]</div>
                        )}
                        {Number(cart.price_gap) !== 0 && (
                          <div className="priceGap">
                            ({priceComma(cart.price_gap)})
                          </div>
                        )}
                      </td>

                      <td>
                        {priceComma(cart.default_price) + '원'}
                        {/* + cart.order_product_id} */}
                      </td>
                      <td className="tbodyUpDownLine">
                        <span>
                          <input
                            type="text"
                            Value={cart.quantity > 0 ? cart.quantity : 0}
                            onChange={() => quantityOnChange(index)}
                          />
                          <button onClick={() => handelQuantity(1, index)}>
                            &#9650;
                          </button>
                          <button onClick={() => handelQuantity(-1, index)}>
                            &#9660;
                          </button>
                        </span>
                      </td>
                      {/* {index === 0 && ( */}
                      {/* <td className="tbodyDelivery" rowSpan={cartData.length}> */}
                      <td className="tbodyDelivery">
                        {index === 0 ? '2,500' : '0'}
                      </td>
                      {/* )} */}
                      <td>
                        {priceComma(cart.default_price * cart.quantity) + '원'}
                      </td>
                      {/* <td>{priceComma(cart.default_price * cart.quantity)}</td> */}
                      <td className="tbodyChiceLine">
                        <button onClick={() => handleDelete(index)}>
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">
                      <span>기본배송</span>
                    </td>
                    <td colSpan="6">
                      <div className="totalPrice">
                        {`상품구매금액 ${priceComma(
                          totalPriceResult()
                        )} 배송비  ${priceComma(deliveryPrice)} = `}
                        합계 :
                        <span>
                          {priceComma(totalPriceResult() + deliveryPrice)}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </TableWrap>
            <hr />
          </div>
        </div>
      </>
    );
  }
}

export default Cart;
