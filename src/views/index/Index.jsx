import React, { Component } from 'react';
import memoryStorage from "../../utils/memoryStorage";
import { Redirect } from "react-router-dom";

import LeftNav from '../../layout/left-nav'
import Header from '../../layout/header'
import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;

class Home extends Component {
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
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;