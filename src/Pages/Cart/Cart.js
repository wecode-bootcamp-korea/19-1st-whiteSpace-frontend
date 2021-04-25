import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { API } from '../../config';
import Nav from '../../Components/Nav/Nav';
import TableWrap from '../Order/Components/TableWrap/TableWrap';
import CartTotalPrice from './Component/CartTotalPrice';
import CartButton from './Component/CartButton';
import Checkbox from './Component/Checkbox';
import './Cart.scss';

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      deliveryPrice: 0,
      cartId: '',
      allCartSelect: false,
    };
  }

  componentDidMount() {
    this.getBackDataCart();
  }

  checkEmptyArr = () => {
    if (this.state.cartData.length === 0) return;
  };

  getBackDataCart = () => {
    fetch(API + '/cart', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        const addCartArr = [];

        if (data.cart.length > 0) {
          for (let i = 0; i < data.cart.length; i++) {
            addCartArr.push({
              isSelect: false,
              ...data.cart[i],
            });
          }
        }
        this.setState({
          cartId: data.cart_id,
          cartData: addCartArr,
          deliveryPrice: data.cart.length > 0 ? 2500 : 0,
          allCartSelect: false,
        });
      });
  };

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  // 개별 체크박스 클릭시
  toggleCheckbox = (e, label, index) => {
    this.checkEmptyArr();

    if (Number(index) === -1) return;

    const cartArr = this.state.cartData;
    cartArr[index].isSelect = !cartArr[index].isSelect;

    this.setState({
      cartData: cartArr,
    });
  };

  // 전체 체크박스 체크시 처리
  allCheckClick = e => {
    this.checkEmptyArr();
    const { allCartSelect, cartData } = this.state;

    this.setState({
      allCartSelect: !allCartSelect,
    });

    for (let i = 0; i < cartData.length; i++) {
      cartData[i].isSelect = e.target.checked ? true : false;
    }
  };

  // 선택상품 주문버튼 클릭시
  selectCartOrder = () => {
    this.checkEmptyArr();
    const checkCartArr = [];
    const { cartData, cartId, deliveryPrice } = this.state;
    let totalResultPrice = 0;
    let isCheckBoxCount = 0;

    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].isSelect) {
        checkCartArr.push(cartData[i]);
        totalResultPrice +=
          (cartData[i].default_price * (1 - cartData[i].discount_rate) +
            Number(Math.floor(cartData[i].price_gap))) *
          cartData[i].quantity;
        isCheckBoxCount++;
      }
    }

    // 체크된 상품이 없으면 종료
    if (isCheckBoxCount === 0) return;

    const state = {
      pathname: '/order',
      state: {
        cartId: cartId,
        totalPrice: totalResultPrice,
        cartData: checkCartArr,
        deliveryPrice: deliveryPrice,
      },
    };
    this.props.history.push(state);
  };

  // 선택한 내역 삭제처리
  checkedDelete = () => {
    this.checkEmptyArr();
    const { cartData } = this.state;
    const checkData = !(cartData.length > 0);

    if (checkData) return;

    for (let i = 0; i < cartData.length; i++) {
      cartData[i].isSelect && this.handleDelete(i);
    }
  };

  // 수량 변경시 처리 (up, down 버튼)
  handelQuantity = (e, changeNum, index) => {
    this.checkEmptyArr();
    if (changeNum === -1 && this.state.cartData[index].quantity <= 0) {
      return;
    }

    const changeId = this.state.cartData[index].order_product_id;

    fetch(`${API}/cart/${changeId}`, {
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

  // 수량 직접 입력 전에 초기화
  quantityInput = e => {
    this.checkEmptyArr();
    e.target.value = '';
  };

  // 수량 직접 입력시
  quantityOnChange = (e, index) => {
    this.checkEmptyArr();
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

  // 개별 삭제시
  handleDelete = index => {
    this.checkEmptyArr();
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

  // 모든 장바구니 비우기
  allCartDelete = e => {
    this.checkEmptyArr();
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
    fetch(`${API}/cart?item_id=${deleteData}`, {
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

  // 총액 계산 함수
  totalPriceResult = () => {
    this.checkEmptyArr();
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
    const { cartData, deliveryPrice, cartId, allCartSelect } = this.state;
    const {
      handleDelete,
      handelQuantity,
      quantityOnChange,
      allCartDelete,
      quantityInput,
      totalPriceResult,
      toggleCheckbox,
      selectCartOrder,
      checkedDelete,
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
                    <th className="tableCheckBoxWidth">
                      <Checkbox
                        // label="allCartSelect"
                        index="-1"
                        handleCheckboxChange={toggleCheckbox}
                        key="allCartSelect"
                        onClick={this.allCheckClick}
                        checked={allCartSelect}
                      />
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
                      {/* 개별 체크박스 부분 */}
                      <td className="tbodyCheckBoxLine">
                        <Checkbox
                          // label={cart.order_product_id}
                          index={index}
                          handleCheckboxChange={toggleCheckbox}
                          key={cart.order_product_id}
                          checked={cart.isSelect}
                        />
                      </td>
                      <td className="tbodyImgLine">
                        <img
                          src={cart.thumbnail_image}
                          alt={cart.product_name}
                        />
                      </td>
                      {/* 상품정보 (옵션은 값이 있을 때만 보이게 처리) */}
                      <td className="tbodyProductLine">
                        <Link to={`/products/${cart.product_id}`}>
                          <div>{cart.name}</div>
                        </Link>
                        {cart.bundle_name !== null && (
                          <div className="bundleName">[{cart.bundle_name}]</div>
                        )}
                        {Number(cart.price_gap) !== 0 && (
                          <div className="priceGap">
                            ({Math.floor(cart.price_gap).toLocaleString('ko')})
                          </div>
                        )}
                      </td>
                      {/* 판매가 - 할인가격 반영 */}
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
                      {/* 수량 입력 및 up, down 버튼 부분 */}
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
                      {/* 배송비 부분 */}
                      <td className="tbodyDelivery">
                        {index === 0 ? '2,500' : '0'}
                      </td>
                      {/* 합계 부분 (이 라인의 판매가(할인률 구한값) + 배송비) */}
                      <td className="resultPriceWidth">
                        {(
                          lastProductPrice * cart.quantity +
                          (index === 0 ? 2500 : 0)
                        ).toLocaleString('ko') + '원'}
                      </td>
                      {/* 개별 삭제 버튼 부분 */}
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
                      <div className="result">
                        {`상품구매금액 ${(totalResultPrice = totalPriceResult()).toLocaleString(
                          'ko'
                        )} + 배송비  ${deliveryPrice.toLocaleString('ko')} = `}
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
              <div>
                <span>선택상품을 </span>
                <CartButton onClick={checkedDelete}>x 삭제하기</CartButton>
              </div>
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
              <CartButton
                className="checkOrderButton"
                onClick={selectCartOrder}
              >
                선택상품주문
              </CartButton>
              <Link to="/category">
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
