import React, { Component } from 'react';
import './index.scss'
import logo from "../../assets/images/logo.png";
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import menuConfig from "../../config/menuConfig";
const { SubMenu } = Menu;
class LeftNav extends Component {
  getMenuNodes (menuList) {
    return menuList.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt=""/>
          <h1 style={{color: '#fff'}}>硅谷后台</h1>
        </Link>
        <Menu
        mode="inline"
        theme="dark"
        >
          {this.getMenuNodes(menuConfig)}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;