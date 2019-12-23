import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import localStorage from "../../utils/localStorage";
import memoryStorage from "../../utils/memoryStorage";
import { Modal } from "antd";
import './index.scss'


class Header extends Component {
  logout = () => {
    Modal.confirm({
      content: '确定退出吗？',
      onOk: () => {
        localStorage.removeUser()
        memoryStorage.userInfo = {}
        this.props.history.replace('/login')
      }
    })
  }
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{'admin'}</span>
          <span className="logout" onClick={this.logout}>退出</span>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span className="date-time">2019-12-23 12:12:12</span>
            <span className="weather">
              <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt=""/>
              <span>多云转阴</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header)