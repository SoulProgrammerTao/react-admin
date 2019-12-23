import React, { Component } from 'react';
import memoryStorage from "../../utils/memoryStorage";
import { Redirect, Route, Switch } from "react-router-dom";

import LeftNav from '../../layout/left-nav'
import Header from '../../layout/header'
import { Layout } from 'antd';

// 路由组件
import Home from "../home";
import Category from "../category";
import Product from "../product";
import User from "../user";
import Role from "../role";
import Bar from "../bar";
import Line from "../line";
import Pie from "../pie";
import Order from "../order";


const { Footer, Sider, Content } = Layout;

class Index extends Component {
  render() {
    const userInfo = memoryStorage.userInfo
    if (!userInfo._id) return <Redirect to="/login"/>
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{backgroundColor: '#f0f2f5'}}>
            <Switch>
              <Redirect from="/" exact to="/home"></Redirect>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/product" component={Product}/>
              <Route path="/user" component={User}/>
              <Route path="/role" component={Role}/>
              <Route path="/bar" component={Bar}/>
              <Route path="/line" component={Line}/>
              <Route path="/pie" component={Pie}/>
              <Route path="/order" component={Order}/>
              {/* <Redirect to="/home"></Redirect> */}
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Index;