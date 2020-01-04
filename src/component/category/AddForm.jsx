import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { Input, Select, Form } from "antd";
const Item = Form.Item
const { Option } = Select;


class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    categorys: PropTypes.array.isRequired, // 一级分类的数组
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const {categorys} = this.props
    const { getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
        {
          getFieldDecorator('parentId', {
            initialValue: '0'
          })(
            <Select>
              <Option value='0'>一级分类</Option>
              {
                categorys.map(e => <Option value={e._id} key={e._id}>{e.name}</Option>)
              }
            </Select>
          )
        }
        </Item>
        <Item>
          {
            getFieldDecorator('categoryName',{
              initialValue: '',
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
export default Form.create()(AddForm)