import React from "react";
import PropTypes from 'prop-types';
import "./SaveBtn.css";

class SaveBtn extends React.Component {
  
  render () {
    return (
      <span className="save-btn" onClick={this.props.onClick}>
        Save
      </span>
    );
  }
}

SaveBtn.props = {
  onClick: PropTypes.func
}

export default SaveBtn;
