import React, { Component } from 'react';
import DaumPostCode from 'react-daum-postcode';
import './AddressModal.scss';

class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      zoneCode: '',
      fullAddress: '',
      isDaumPost: false,
      isRegister: false,
      register: [],
    };
  }

  handleOpenPost = () => {
    this.setState({
      isDaumPost: true,
    });
  };

  handleAddress = data => {
    let AllAddress = data.address;
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
      AllAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    this.setState({
      fullAddress: AllAddress,
      zoneCode: zoneCodes,
    });
    localStorage.setItem('postCode', data.zonecode);
    localStorage.setItem('mainAddress', data.address);
  };

  render() {
    // const { isModalShow, isModalClose } = this.props;
    const { isDaumPost, fullAddress, zoneCode } = this.state;

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
              <input type="text" />
              <button type="button" onClick={this.handleOpenPost}>
                <span>우편번호 찾기</span>
              </button>
            </div>
          </div>
        </div>
        {isDaumPost ? (
          <DaumPostCode
            onComplete={this.handleAddress}
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
