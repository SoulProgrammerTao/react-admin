import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import "./login.scss";
import logo from "../../assets/images/logo.png";
import { login } from '../../api/login'

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const form = this.props.form
    form.validateFields(async (err, values) => {
      const res = await login(values)
      console.log(res)
    })

  };
  render() {
    const { getFieldDecorator } = this.props.form
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
                getFieldDecorator('username', {rules: [{required: true, message: '请输入用户名'}]})(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {rules: [{required: true, message: '请输入密码'}]})(
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
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
export default WrappedNormalLoginForm;