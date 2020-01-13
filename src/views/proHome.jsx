/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import { Card, Select, Input, Button, Table } from "antd";
import LinkButton from "../component/link-button";
import { fetchProducts } from "../api";

const Option = Select.Option
export default function ProHome (props) {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState()
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [searchName, setSearchName] = useState()
  const [searchType, setSearchType] = useState(null)
  useEffect(()=> {
    getProducts()
  }, [])
  // 获取指定页码的列表数据显示
  const getProducts = async() => {
    setLoading(true)
    const res = await fetchProducts({pageNum, pageSize})
    setLoading(false)
    res && setProducts(res.list)
  }
  // 列表
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      render: (price) => '¥' + price
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      render: (item) => stateRender(item)
    },
    {
      title: '操作',
      width: 100,
      render: (item) => handleRender(item)
    }
  ]
  // 组件
  const stateRender = (item) => (
    <div>
      <Button type="primary">下架</Button>
      <span>在售</span>
    </div>
  ) 
  const handleRender = (item) => (
    <div>
      <LinkButton>详情</LinkButton>
      <LinkButton>修改</LinkButton>
    </div>
  )
  const title=(
    <span>
      <Select value={searchType} style={{width: 100}}>
        <Option value={null}>全部</Option>
        <Option value='productName'>按名称搜索</Option>
        <Option value='productDesc'>按描述搜索</Option>
      </Select>
      <Input
        placeholder='关键字'
        style={{width: 150, margin: '0 15px'}}
        value={searchName}
      />
      <Button type="primary">搜索</Button>
    </span>
  )
  const extra = (
    <Button type="primary" icon="plus" onClick={() => {
      props.history.push("/product/edit")
    }}>添加商品</Button>
  )
  return (
    <Card title={title} extra={extra} style={{ width: '100%' }}>
      <Table
        rowKey="_id"
        bordered
        loading={loading}
        dataSource={products}
        columns={columns}
        pagination={{defaultPageSize: 5, showQuickJumper: true}}
      >
      </Table>
    </Card>
  )
}
