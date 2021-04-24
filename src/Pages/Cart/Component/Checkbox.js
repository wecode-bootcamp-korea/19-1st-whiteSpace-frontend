import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  // state = {
  //   isChecked: false,
  // };

  // toggleCheckboxChange = () => {
  //   const { handleCheckboxChange, label } = this.props;

  //   this.setState(({ isChecked }) => ({
  //     isChecked: !isChecked,
  //   }));

  //   handleCheckboxChange(label);
  // };

  render() {
    const { label, onClick, checked, handleCheckboxChange, index } = this.props;
    // const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={checked}
            onClick={onClick}
            onChange={e => handleCheckboxChange(e, label, index)}
          />

          {label}
        </label>
      </div>
    );
  }
}

// Checkbox.propTypes = {
//   label: PropTypes.string.isRequired,
//   handleCheckboxChange: PropTypes.func.isRequired,
// };

export default Checkbox;
