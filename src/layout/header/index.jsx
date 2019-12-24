import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import localStorage from "../../utils/localStorage";
import memoryStorage from "../../utils/memoryStorage";
import { Modal } from "antd";
import { formateDate } from "../../utils/index";
import './index.scss'


class Header extends Component {
  state = {
    username: memoryStorage.userInfo.username,
    currTime: ''
  }
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
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currTime = formateDate(Date.now())
      this.setState({ currTime })
    }, 1000);
  }
  render() {
    this.getTime()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{this.state.username}</span>
          <span className="logout" onClick={this.logout}>退出</span>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
          <span className="date-time">{this.state.currTime}</span>
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