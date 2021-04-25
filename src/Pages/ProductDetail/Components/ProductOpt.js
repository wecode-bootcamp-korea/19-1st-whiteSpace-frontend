import React, { Component } from 'react';
import './ProductOpt.scss';

class ProductOpt extends Component {
  state = {
    activeName: null,
    selectedColor: '',
    selectedSize: '',
    selectedBundle: '',
  };

  changeColor = (e, index, name) => {
    this.setState({
      selectedColor: name,
      activeName: index,
    });
    localStorage.setItem('colorId', e.target.id);
  };

  changeSize = e => {
    const selectOpt = e.target;
    const selectOptId = selectOpt.children[selectOpt.selectedIndex].id;
    this.setState({
      selectedSize: e.target.value,
    });
    localStorage.setItem('sizeId', selectOptId);
  };

  changeBundle = e => {
    const selectOpt = e.target;
    const selectOptId = selectOpt.children[selectOpt.selectedIndex].id;
    this.setState(
      {
        selectedBundle: e.target.value,
      },
      () => this.props.calBundlePrice(e.target.value)
    );
    localStorage.setItem('bundleId', selectOptId);
  };

  render() {
    const {
      activeName,
      selectedColor,
      selectedSize,
      selectedBundle,
    } = this.state;

    const {
      colors = [],
      sizes = [],
      bundles = [],
      count,
      name,
      incrQty,
      decrQty,
      delProduct,
    } = this.props;

    const { changeColor, changeSize, changeBundle } = this;

    return (
      <div className="productOpt">
        <div className="optionBox">
          <span>컬러</span>
          <div className="colorBoxes">
            {colors.map((color, index) => {
              return (
                <>
                  <div className="colorNname" key={index}>
                    <div
                      id={color.id}
                      className={
                        activeName === index
                          ? 'addBorder colorBox'
                          : color.hex_code && 'colorBox'
                      }
                      style={{
                        backgroundColor: color.hex_code,
                      }}
                      onClick={e => changeColor(e, index, color.name)}
                    ></div>
                    <p className="selectedColorName">
                      {activeName === index && color.name}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="optionBox">
          <span>사이즈</span>
          <select onChange={changeSize}>
            <option>-[필수] 옵션을 선택해주세요-</option>
            <option disabled>--------------------------------</option>
            {selectedColor &&
              sizes.map(size => {
                return (
                  <option id={size.id} value={size.name} key={size.id}>
                    {size.name}
                    {size.stock === 0 && '(품절)'}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="optionBox">
          <span>구성</span>
          <select onChange={changeBundle}>
            <option>-[필수] 옵션을 선택해주세요-</option>
            <option disabled>--------------------------------</option>
            {selectedSize &&
              bundles.map(bundle => {
                return (
                  <option id={bundle.id} value={bundle.name} key={bundle.id}>
                    {bundle.name}
                    {(bundle.price_gap > 0 || bundle.price_gap < 0) &&
                      '(' + parseInt(bundle.price_gap.replace(',', '')) + '원)'}
                    {bundle.stock === 0 && '(품절)'}
                  </option>
                );
              })}
          </select>
        </div>

        {selectedBundle && (
          <div className="totalInfo">
            <div className="totalDesc">
              <span className="item">{name}</span>
              <span className="optItem">
                {selectedColor}/{selectedSize}/{selectedBundle}
              </span>
            </div>
            <div className="countBtnBox">
              <button onClick={incrQty}>
                <i className="fas fa-sort-up"></i>
              </button>
              <span className="countQty">{count}</span>
              <button onClick={decrQty}>
                <i className="fas fa-sort-down"></i>
              </button>
            </div>
            <button className="delBtn" onClick={delProduct}>
              x
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ProductOpt;
