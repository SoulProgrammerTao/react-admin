import React, { Component } from 'react';
import memoryStorage from "../../utils/memoryStorage";
import { Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    const userInfo = memoryStorage.userInfo
    if (!userInfo._id) return <Redirect to="/login"/>
    return (
      <div className="home">
        Hello {}
      </div>
    );
  }
}

export default Home;