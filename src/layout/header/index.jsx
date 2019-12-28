import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import localStorage from "../../utils/localStorage";
import memoryStorage from "../../utils/memoryStorage";
import { Modal } from "antd";
import { formateDate } from "../../utils/index";
import './index.scss'
import { getWeather } from "../../api";
import menuList from "../../config/menuConfig";


class Header extends Component {
  state = {
    username: memoryStorage.userInfo.username,
    currTime: '',
    weather: {}
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
  async componentDidMount () {
    this.getTime()
    const weather = await getWeather('北京')
    this.setState({weather})
  }
  getTitle = () => {
    let title = ''
    menuList.forEach(item => {
      if (item.key === this.props.location.pathname) {
        title = item.title
      } else if (item.children && item.children.length) {
        const menu = item.children.find(ele => ele.key === this.props.location.pathname)
        menu && (title = menu.title)
      }
    })
    return title
  }
  render() {
    const {username, currTime, weather } = this.state
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <span className="logout" onClick={this.logout}>退出</span>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
          <span className="date-time">{currTime}</span>
            <span className="weather">
              <img src={weather.dayPictureUrl} alt=""/>
              <span>{weather.weather}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header)