import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import './PayMethod.scss';
export default class PayMethod extends Component {
  constructor() {
    super();
    this.state = {
      method: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange = e => {
    const { value } = e.target;
    this.setState({
      method: value,
    });
  };
  render() {
    const { method } = this.state;
    const { handleInputChange } = this;
    const { goToPay } = this.props;

    return (
      <div className="payMethod">
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="radio"
                    id="card"
                    value="card"
                    checked={method === 'card'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="card">카드결제</label>
                </th>
                <th>
                  <input
                    type="radio"
                    id="cash"
                    value="cash"
                    checked={method === 'cash'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="cash">무통장 결제</label>
                </th>
                <th>
                  <input
                    type="radio"
                    id="payco"
                    value="payco"
                    checked={method === 'payco'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="payco">페이코 (간편결제)</label>
                </th>
                <th>
                  <input
                    type="radio"
                    id="kakao"
                    value="kakao"
                    checked={method === 'kakao'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="kakao">카카오 (간편결제)</label>
                </th>
                <th rowSpan="3">최종 결제 금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" rowSpan="2">
                  <>
                    <div>
                      {method === 'card' && '카드 결제는 준비중입니다.'}
                      {method === 'cash' && (
                        <p>신한은행 140-012-076920 (주) 여백</p>
                      )}
                      {method === 'payco' && (
                        <button className="payco">PAYCO 로그인</button>
                      )}
                      {method === 'kakao' && (
                        <button className="kakao">KAKAO 로그인</button>
                      )}
                    </div>
                  </>
                </td>
                <td className="totalPrice">
                  <span>159,600원</span>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="payBtn" onClick={goToPay}>
                    결제하기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}
