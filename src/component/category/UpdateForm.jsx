import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { Input, Form } from "antd";
const Item = Form.Item


class UpdateForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    category: PropTypes.object.isRequired, // 一级分类的数组
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const {category} = this.props
    const { getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName',{
              initialValue: category.name,
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    );
  }
}
export default Form.create()(UpdateForm)