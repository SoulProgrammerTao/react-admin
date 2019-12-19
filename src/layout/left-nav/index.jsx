import React, { Component } from 'react';
import './index.scss'
import logo from "../../assets/images/logo.png";
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
const { SubMenu } = Menu;
class LeftNav extends Component {
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
          <Menu.Item key="1">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="heart" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="2">
              <Link to="/category">
                <Icon type="heart" />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/product">
                <Icon type="heart" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4">
            <Link to="/user">
              <Icon type="heart" />
              <span>用户管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/role">
              <Icon type="heart" />
              <span>角色管理</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="heart" />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key="6">
              <Link to="/bar">
                <Icon type="heart" />
                <span>柱形图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/line">
                <Icon type="heart" />
                <span>折线图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/pie">
                <Icon type="heart" />
                <span>饼图</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Link to="/order">
              <Icon type="heart" />
              <span>订单管理</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default LeftNav;