import React, { Component } from 'react';
import DaumPostCode from 'react-daum-postcode';
import './AddressModal.scss';

class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoneCode: '',
      fullAddress: '',
      detailAddress: '',
      isDaumPost: false,
    };
  }

  handleOpenPost = () => {
    this.setState({
      isDaumPost: true,
    });
  };

  handleAddress = data => {
    let allAddress = data.address;
    let extraAddress = '';
    let zoneCodes = data.zonecode;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      allAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    this.setState({
      fullAddress: allAddress,
      zoneCode: zoneCodes,
    });
    localStorage.setItem('postCode', data.zonecode);
    localStorage.setItem('mainAddress', data.address);
  };

  getDetailAddress = address => {
    this.setState({ detailAddress: address });
    localStorage.setItem('detailAddress', address);
  };
  render() {
    const { isDaumPost, fullAddress, zoneCode } = this.state;
    const { handleOpenPost, handleAddress, getDetailAddress } = this;

    const width = 595;
    const height = 450;
    const modalStyle = {
      position: 'absolute',
      top: 350,
      left: 400,
      zIndex: '100',
      border: '1px solid #000000',
      overflow: 'hidden',
    };
    return (
      <div className="modalRow">
        <div className="modalCell cellTit">
          <div></div>
        </div>
        <div className="modalCell">
          <div className="cellFirst">
            <div className="zipCode">{zoneCode}</div>
            <div className="address">{fullAddress}</div>
            <div className="addressBox">
              <input
                type="text"
                placeholder="상세주소를 입력해주세요."
                onChange={e => getDetailAddress(e.target.value)}
              />
              <button type="button" onClick={handleOpenPost}>
                <span>우편번호 찾기</span>
              </button>
            </div>
          </div>
        </div>
        {isDaumPost ? (
          <DaumPostCode
            onComplete={handleAddress}
            autoClose
            width={width}
            height={height}
            style={modalStyle}
            isDaumPost={isDaumPost}
          />
        ) : null}
      </div>
    );
  }
}

export default AddressModal;
