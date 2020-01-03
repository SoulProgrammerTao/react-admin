import React, { Component } from 'react';
import "./link-button.scss";
class LinkButton extends Component {
  render() {
    return <button {...this.props} className="link-button"></button>
  }
}

export default LinkButton;