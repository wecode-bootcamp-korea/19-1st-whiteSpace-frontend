import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SURVER_IP } from '../../config';
import Nav from '../../Components/Nav/Nav';
import TableWrap from '../Order/Components/TableWrap/TableWrap';
import CartTotalPrice from './Component/CartTotalPrice';
import CartButton from './Component/CartButton';
import Checkbox from './Component/Checkbox';
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
      cartId: '',
      allCartSelect: false,
    };
    this.quantityRef = React.createRef();
  }

  getBackDataCart = () => {
    // fetch('data/cartData.json')
    fetch(SURVER_IP + '/cart', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
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
            cartId: data.cart_id,
            cartData: addCartArr,
            deliveryPrice: 2500,
            totalPrice: Number(data.total_price),
          });
        }
      });
  };

  goToOrder = () => {
    this.props.history.push(`order/${this.state.cartId}`);
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

    console.log(label);
    // console.log(e);
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    console.log(formSubmitEvent);
    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  };

  handleDelete = index => {
    const dataArr = this.state.cartData;
    const deleteDataArr = dataArr[index].order_product_id;
    // console.log(deleteDataArr);

    // DELETE 10.58.7.33:8000/cart/item_id=2,5,8

    fetch(SURVER_IP + `/cart?item_id=${deleteDataArr}`, {
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

  handelQuantity = (e, changeNum, index) => {
    const { quantityRef } = this;
    if (changeNum === -1 && this.state.cartData[index].quantity <= 0) {
      return;
    }

    const changeId = this.state.cartData[index].order_product_id;
    // console.log('fetch - index : ' + index);
    // console.log(changeNum);

    fetch(SURVER_IP + '/cart/' + changeId, {
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

    quantityRef.current.value = changeNum;
  };

  priceComma = price => {
    const won = Math.floor(price);

    return won.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  changeQuantity = (e, index) => {
    const { cartData } = this.state;

    const sendQuantity = cartData[index].quantity;
  };

  allCheckClick = e => {
    // const checkArr = [];
    // for (let i = 0; i < this.state.cartData.length; i++) {
    //   checkArr.push(checkbox);
    // }
    // setItem;
    // console.log(e);
  };

  quantityOnChange = (e, index) => {
    const beforeNum = this.state.cartData[index].quantity;
    const newNum = Number(e.target.value);
    // console.log(e);
    // console.log(index);
    const postNum = newNum - beforeNum;

    console.log(e.target);
    console.log(e.target.value);

    if (newNum > 0) {
      e.target.value = newNum;
      // if (newNum > 10) {
      //   e.target.value = 10;
      //   alert('최대 구매 수량은 10개입니다.');
      //   return;
      // }
    } else {
      e.target.value = 0;
      alert('잘못된 값을 입력하셨습니다.');
      return false;
    }

    this.handelQuantity(e, postNum, index);
  };

  quantityInput = e => {
    e.target.value = '';
  };

  render() {
    const {
      cartData,
      quantity,
      totalPrice,
      deliveryPrice,
      cartId,
      allCartSelect,
    } = this.state;
    const url = '/order/' + { cartId };
    // console.log(cartId);
    const {
      priceComma,
      handleDelete,
      handelQuantity,
      quantityOnChange,
      goToOrder,
      allCartDelete,
      quantityRef,
      checkInputQuantity,
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
                    {/* <th className="tableCheckBoxWidth">
                      <Checkbox
                        label="allCartSelect"
                        handleCheckboxChange={this.toggleCheckbox}
                        key="allCartSelect"
                        onClick={this.allCheckClick}
                      />
                    </th> */}
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
                      {/* <td className="tbodyCheckBoxLine">
                        <input type="checkbox" />
                        <Checkbox
                          label={cart.order_product_id}
                          handleCheckboxChange={this.toggleCheckbox}
                          key={cart.order_product_id}
                        />
                      </td> */}
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
                            maxLength="1"
                            value={cart.quantity > 0 ? cart.quantity : 0}
                            onChange={e => quantityOnChange(e, index)}
                            onKeyDown={this.quantityInput}
                            ref={quantityRef}
                          />
                          <button onClick={e => handelQuantity(e, 1, index)}>
                            &#9650;
                          </button>
                          <button onClick={e => handelQuantity(e, -1, index)}>
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
                      <span>[기본배송]</span>
                    </td>
                    <td colSpan="6">
                      <div className="totalPrice">
                        {`상품구매금액 ${priceComma(
                          totalPrice
                        )} 배송비  ${priceComma(deliveryPrice)} = `}
                        합계 :
                        <span>
                          {priceComma(totalPrice + deliveryPrice) + '원'}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <hr />
            </TableWrap>
            <div className="cartControllButtonBox">
              {/* <div>
                <span>선택상품을 </span>
                <CartButton>x 삭제하기</CartButton>
              </div> */}
              <div></div>
              <CartButton className="clearCart" onClick={allCartDelete}>
                장바구니비우기
              </CartButton>
            </div>
            <CartTotalPrice
              totalCartInfo={{
                totalPrice: totalPrice,
                deliveryPrice: deliveryPrice,
              }}
              priceComma={priceComma}
            />
            <div className="cartButtonPosition">
              {/* <Link to={url}> */}
              <CartButton className="totalOrderButton" onClick={goToOrder}>
                전체상품주문
              </CartButton>
              {/* </Link> */}
              {/* <CartButton
                className="checkOrderButton"
                onClick={this.handleFormSubmit}
              >
                선택상품주문
              </CartButton> */}
              <Link to="/">
                <CartButton className="countineShoppingButton">
                  쇼핑계속하기
                </CartButton>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Cart);
