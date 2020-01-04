import React, { Component } from 'react';
import "./category.scss";
import { Card, Button, Table, Icon, Modal, Message } from "antd";
import LinkButton from "../component/link-button";
import { categoryList, categoryAdd, categoryUpdate } from "../api";
import AddForm from "../component/category/AddForm";
import UpdateForm from "../component/category/UpdateForm";
class category extends Component {
  state = {
    categoryList: [],
    parentId: '0',
    parentName: '',
    loading: false,
    showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  }
  
  initColumns () {
    // 操作按钮
    const renderFunc = (item) => (
      <div>
        <LinkButton onClick={() => {
          this.updateCategory = item
          this.setState({showStatus: 2})
        }}>修改分类</LinkButton>
        {this.state.parentId === '0' ? <LinkButton onClick={() => {
          this.setState({parentId: item._id,parentName: item.name}, () => {
            this.getCategoryList(this.state.parentId)
          })
        }}>查看子分类</LinkButton> : null}
      </div>
    )
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (item) => renderFunc(item)
      }
    ]
  }
  // 获取分类列表
  getCategoryList = async(parentId) => {
    this.setState({loading: true})
    const res = await categoryList(parentId)
    this.setState({loading: false})
    const list = res.data.map(item => Object.assign(item, {key: item._id}))
    this.setState({categoryList: list})
  }
 
  // 添加分类
  createCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({showStatus: 0})
        const res = await categoryAdd(values)
        if (!res.status) {
          Message.success('添加成功')
          const parentId = values.parentId
          this.getCategoryList(parentId)
          if (parentId !== '0') {
            const parentName = this.state.categoryList.find(item => item._id === parentId).name
            this.setState({parentId, parentName})
          }
        }
      }
    })
  }
  // 修改分类
  categoryxxxx = () => {
    this.form.validateFields(async(err,values)=> {
      if (!err) {
        console.log(values)
        const categoryId = this.updateCategory._id
        const {categoryName} = values
        this.setState({showStatus: 0})
        const res = await categoryUpdate({categoryId, categoryName})
        if (res.status === 0) {
          Message.success('修改成功')
          this.getCategoryList(this.state.parentId)
        }
      }
    })
  }
  /*
  响应点击取消: 隐藏确定框
   */
  handleCancel = () => {
    // 清除输入数据
    this.form.resetFields()
    // 隐藏确认框
    this.setState({
      showStatus: 0
    })
  }

  componentWillMount () {
    this.initColumns()
  }
  componentDidMount () {
    this.getCategoryList('0') // 获取一级分类
  }
  render() {
    const {categoryList, parentId, parentName, loading, showStatus} = this.state
    const extra = <Button icon="plus" type="primary" onClick={() => this.setState({showStatus: 1})}>添加</Button>
    const title =  parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={() => {
          this.setState({parentId: '0',parentName: ''},() => {this.getCategoryList('0')})
        }}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{marginRight: 5}}/>
        <span>{parentName}</span>
      </span>
    )
    return (
      <Card title={title} extra={extra} style={{ width: '100%' }}>
        <Table
          loading={loading}
          columns={this.columns}
          dataSource={categoryList}
          bordered
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
        />
        <Modal
          visible={showStatus === 1}
          title="添加分类"
          onOk={this.createCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categorys={categoryList}
            setForm={(form) => {this.form = form}}
          />
        </Modal>
        <Modal
          visible={showStatus === 2}
          title="修改分类"
          onOk={this.categoryxxxx}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            category={this.updateCategory}
            setForm={(form) => {this.form = form}}
          />
        </Modal>

      </Card>
    );
  }
}

export default category;