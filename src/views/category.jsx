import React, { useState, useEffect, useRef } from 'react';
import "./category.scss";
import { Card, Button, Table, Icon, Modal, Message } from "antd";
import LinkButton from "../component/link-button";
import { categoryList, categoryAdd, categoryUpdate } from "../api";
import AddForm from "../component/category/AddForm";
import UpdateForm from "../component/category/UpdateForm";
export default function Category(props) {
  const [categorys, setCategorys] = useState([]);
  const [parentId, setParentId] = useState('0');
  const [parentName, setParentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(0); // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  const formRef = useRef()
  const updateCategoryRef = useRef()
  // 获取列表
  useEffect(()=> {
    getCategoryList()
  }, [])
  // 获取分类列表
  const getCategoryList = async(parentId) => {
    setLoading(true)
    const res = await categoryList(parentId)
    setLoading(false)
    const list = res.map(item => Object.assign(item, {key: item._id}))
    setCategorys(list)
  }
  // categoryUpdate
  const categoryUp = () => {
    formRef.current.validateFields(async (err, values) => {
      if (!err) {
        setShowStatus(0)
        const res = await categoryUpdate({
            categoryId: updateCategoryRef.current._id,
            categoryName: values.categoryName
          })
        if (res) {
          Message.success('修改成功')
          getCategoryList(parentId)
        } else {
          Message.error(res.msg)
        }
      }
    })
  }
  // categoryCreate
  const categoryCreate = () => {
    formRef.current.validateFields(async (err, values) => {
      if (!err) {
        setShowStatus(0)
        const res = await categoryAdd(values)
        if (res) {
          Message.success('添加成功')
          setParentId(values.parentId)
        } else {
          Message.error(res.msg)
        }
      }
    })
  }
  // 取消
  const cancel = () => {
    // 清除输入数据
    formRef.current.resetFields()
    // 隐藏确认框
    setShowStatus(0)
  }

  // 操作按钮
  const renderFunc = (item) => (
    <div>
      <LinkButton onClick={() => {
        updateCategoryRef.current = item
        setShowStatus(2)
      }}>修改分类</LinkButton>
      {
        parentId === '0' ? <LinkButton onClick={() => {
          setParentId(item._id)
          setParentName(item.name)
          getCategoryList(item._id)
        }}>查看子分类</LinkButton> : null
      }
    </div>
  )
  const title =  parentId === '0' ? '一级分类列表' : (
    <span>
      <LinkButton onClick={() => {
        setParentId('0')
        getCategoryList('0')
      }}>一级分类列表</LinkButton>
      <Icon type='arrow-right' style={{marginRight: 5}}/>
      <span>{parentName}</span>
    </span>
  )
  const columns = [
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
  const extra = <Button icon="plus" type="primary" onClick={() => setShowStatus(1)}>添加</Button>
  return (
    <Card title={title} extra={extra} style={{ width: '100%' }}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={categorys}
        bordered
        pagination={{defaultPageSize: 5, showQuickJumper: true}}
      />
      <Modal
        visible={showStatus === 1}
        title="添加分类"
        onOk={categoryCreate}
        onCancel={cancel}
      >
        <AddForm
          categorys={categorys}
          setForm={(form) => {formRef.current = form}}
        />
      </Modal>
      <Modal
        visible={showStatus === 2}
        title="修改分类"
        onOk={categoryUp}
        onCancel={cancel}
      >
        <UpdateForm
          category={updateCategoryRef.current}
          setForm={(form) => {formRef.current = form}}
        />
      </Modal>

    </Card>
  )
}  
