import React, { Component } from 'react';
import "./category.scss";
import { Card, Button, Table, Icon, Modal, Input, Select } from "antd";
import LinkButton from "../component/link-button";
import { categoryList } from "../api";
const { Option } = Select;
class category extends Component {
  state = {
    categoryList: [],
    parentId: '0',
    parentName: '',
    loading: false,
    showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  }
  initColumns () {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (item) => (
          <div>
            <LinkButton onClick={this.updateCategory}>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => {
              this.setState({parentId: item._id,parentName: item.name}, () => {
                this.getCategoryList(this.state.parentId)
              })
            }}>查看子分类</LinkButton> : null}
          </div>
        )
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
  // 关闭弹窗
  handleCancel = () => {
    this.setState({showStatus: 0})
  }
  // 添加分类
  createCategory = () => {
    this.setState({showStatus: 1})
  }
  // 修改分类
  updateCategory = () => {
    this.setState({showStatus: 2})
  }
  componentWillMount () {
    this.initColumns()
  }
  componentDidMount () {
    this.getCategoryList('0') // 获取一级分类
  }
  render() {
    const {categoryList, parentId, parentName, loading, showStatus} = this.state
    const extra = <Button icon="plus" type="primary" onClick={this.createCategory}>添加</Button>
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
        />
        <Modal
          visible={showStatus === 1}
          title="添加分类"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Select defaultValue="0" style={{ width: '100%' }}>
          <Option value="0">一级分类</Option>
          <Option value="二级级分类">二级级分类</Option>
        </Select>
        <Input placeholder="请输入分类名称" style={{ width: '100%', marginTop: 35 }}/>
        </Modal>
        <Modal
          visible={showStatus === 2}
          title="修改分类"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        </Modal>

      </Card>
    );
  }
}

export default category;