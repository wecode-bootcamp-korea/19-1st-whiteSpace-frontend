import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { API } from '../../config';
import Nav from '../../Components/Nav/Nav';
import TableWrap from '../Order/Components/TableWrap/TableWrap';
import CartTotalPrice from './Component/CartTotalPrice';
import CartButton from './Component/CartButton';
import './Cart.scss';

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      totalPrice: 0,
      deliveryPrice: 0,
      cartId: '',
      allCartSelect: false,
    };
  }

  componentDidMount() {
    this.getBackDataCart();
  }

  getBackDataCart = () => {
    fetch(API + '/cart', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        // if (data.cart.length > 0) {
        console.log(data);
        this.setState({
          cartId: data.cart_id,
          cartData: data.cart,
          deliveryPrice: data.cart.length > 0 ? 2500 : 0,
          totalPrice: Number(data.total_price),
        });
        // }
      });
  };

  goToOrder = () => {
    this.props.history.push(`/order/${this.state.cartId}`);
  };

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
  };

  handleDelete = index => {
    const dataArr = this.state.cartData;
    const deleteDataArr = dataArr[index].order_product_id;

    fetch(`${API}/cart?item_id=${deleteDataArr}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res) // or res.json()
      .then(res => {
        this.getBackDataCart();
      });
  };
  handelQuantity = (e, changeNum, index) => {
    if (changeNum === -1 && this.state.cartData[index].quantity <= 0) {
      return;
    }

    const changeId = this.state.cartData[index].order_product_id;

    fetch(API + '/cart/' + changeId, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        quantity: Number(changeNum),
      }),
    })
      .then(res => res) // or res.json().json()
      .then(res => {
        this.getBackDataCart();
      });

    e.target.value = changeNum;
  };

  allCheckClick = e => {
    // const checkArr = [];
    // for (let i = 0; i < this.state.cartData.length; i++) {
    //   checkArr.push(checkbox);
    // }
    // setItem;
  };
  quantityOnChange = (e, index) => {
    const beforeNum = this.state.cartData[index].quantity;
    const newNum = Number(e.target.value);
    const postNum = newNum - beforeNum;
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
      return;
    }

    this.handelQuantity(e, postNum, index);
  };

  quantityInput = e => {
    e.target.value = '';
  };

  allCartDelete = e => {
    const dataArr = this.state.cartData;
    let deleteData = '';

    if (!(dataArr.length > 0)) {
      // alert('삭제할 정보가 없습니다');
      return;
    }

    for (let i = 0; i < dataArr.length; i++) {
      deleteData += dataArr[i].order_product_id;

      i !== dataArr.length - 1 && (deleteData += ',');
    }

    console.log(deleteData);
    fetch(`${API}/cart?item_id=${deleteData}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res) // or res.json()
      .then(res => {
        // console.log(res.MESSAGE);
        this.getBackDataCart();
      });
  };

  // 총액 계산 함수
  totalPriceResult = () => {
    const { cartData } = this.state;
    let sumPrice = 0;
    let productPrice = 0;

    for (let i = 0; i < cartData.length; i++) {
      productPrice =
        cartData[i].discount_rate > 0
          ? cartData[i].default_price * (1 - cartData[i].discount_rate)
          : cartData[i].default_price;
      sumPrice =
        sumPrice +
        (productPrice + Number(cartData[i].price_gap)) * cartData[i].quantity;
    }
    return Number(sumPrice);
  };

  render() {
    const { cartData, totalPrice, deliveryPrice, cartId } = this.state;
    const {
      handleDelete,
      handelQuantity,
      quantityOnChange,
      allCartDelete,
      quantityInput,
      totalPriceResult,
    } = this;
    const title =
      '일반상품' +
      (cartData && cartData.length > 0 ? ' (' + cartData.length + ')' : '');
    // 정상가 * 할인률 계산 변수 선언
    let lastProductPrice = 0;
    let totalResultPrice = 0;

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
                      {/* 상품정보 (옵션은 값이 있을 때만 보이게 처리) */}
                      <td className="tbodyProductLine">
                        <div>{cart.name}</div>
                        {cart.bundle_name !== null && (
                          <div className="bundleName">[{cart.bundle_name}]</div>
                        )}
                        {Number(cart.price_gap) !== 0 && (
                          <div className="priceGap">
                            ({Math.floor(cart.price_gap).toLocaleString('ko')})
                          </div>
                        )}
                      </td>
                      {/* 판매가 -> 할인가격 반영해야함(구현중) */}
                      <td
                        className={
                          cart.discount_rate > 0 ? 'disCountOn' : 'disCountOff'
                        }
                      >
                        <div>
                          {(cart.default_price * 1).toLocaleString('ko') + '원'}
                        </div>
                        <div>
                          {(lastProductPrice =
                            cart.default_price * (1 - cart.discount_rate) +
                            Number(cart.price_gap)).toLocaleString('ko') + '원'}
                        </div>
                        {/* + cart.order_product_id} */}
                      </td>
                      <td className="tbodyUpDownLine">
                        <span>
                          <input
                            type="text"
                            maxLength="1"
                            value={cart.quantity > 0 ? cart.quantity : 0}
                            onChange={e => quantityOnChange(e, index)}
                            onKeyDown={quantityInput}
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
                      {/* 합계 부분 (이 라인의 판매가(할인률 구한값) + 배송비) */}
                      <td>
                        {(
                          lastProductPrice * cart.quantity +
                          (index === 0 ? 2500 : 0)
                        ).toLocaleString('ko') + '원'}
                      </td>
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
                      <div className="Result">
                        {`상품구매금액 ${(totalResultPrice = totalPriceResult()).toLocaleString(
                          'ko'
                        )} 배송비  ${deliveryPrice.toLocaleString('ko')} = `}
                        합계 :
                        <span>
                          {(totalResultPrice + deliveryPrice).toLocaleString(
                            'ko'
                          ) + '원'}
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
              <CartButton
                className="clearCart"
                onClick={allCartDelete}
                disabled={cartData.length === 0}
              >
                장바구니비우기
              </CartButton>
            </div>
            <CartTotalPrice
              totalCartInfo={{
                totalPrice: totalResultPrice,
                deliveryPrice: deliveryPrice,
              }}
            />

            <div className="cartButtonPosition">
              <Link
                to={{
                  pathname: '/order',
                  state: {
                    cartId: cartId,
                    totalPrice: totalResultPrice,
                    cartData: cartData,
                    deliveryPrice: deliveryPrice,
                  },
                }}
              >
                <CartButton className="totalOrderButton" blockButton={false}>
                  전체상품주문
                </CartButton>
              </Link>
              {/* <CartButton
                className="checkOrderButton"
                onClick={this.handleFormSubmit}
              >
                선택상품주문
              </CartButton> */}
              <Link to="/">
                <CartButton
                  className="countineShoppingButton"
                  blockButton={false}
                >
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
