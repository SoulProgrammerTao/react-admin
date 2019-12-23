import React, { Component } from 'react';
import { Form, Icon, Input, Button, Message } from 'antd';
import "./login.scss";
import logo from "../../assets/images/logo.png";
import { login } from '../../api'
import memoryStorage from "../../utils/memoryStorage";
import { Redirect } from "react-router-dom";
import localStorage from "../../utils/localStorage";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const form = this.props.form
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await login(values)
        if (!res.status) {
          memoryStorage.userInfo = res.data
          localStorage.setUser(res.data)
          this.props.history.replace('/')
        } else {
          Message.error(res.msg)
        }
      }
    })
  }
  validatePassword (rule, value, callback) {
    if (!value) return callback('请输入登陆密码')
    if (value.length<4) return callback('登陆密码至少4位字符')
    if (value.length>12) return callback('登陆密码最多12位字符')
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return callback('密码必须是英文、数字或下划线组成')
    callback()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const userInfo = memoryStorage.userInfo
    console.log(userInfo)
    if (userInfo._id) return <Redirect to="/"/>
    return (
      <div className="login">
        <header>
          <img src={logo} alt=""/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username', {rules: [
                  {required: true, message: '请输入用户名'},
                  {min: 4, message: '用户名至少4位字符'},
                  {max: 12, message: '用户名最多12位字符'}
                  ]})
                (
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {rules: [{validator: this.validatePassword}]})(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
const WrapLogin = Form.create()(Login);
// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
export default WrapLogin;