import React, { useState, useEffect, useRef } from 'react';
import LinkButton from "../component/link-button";
import {
  Card,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  } from "antd";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
function ProEdit (props) {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value)
  };
  const title = (
    <span>
      <LinkButton>
        <Icon type='arrow-left' style={{fontSize: 20}}/>
      </LinkButton>
      <span>添加商品</span>
    </span>
  )
  return (
    <Card title={title} style={{ width: '100%' }}>

    </Card>
  )
}

export default Form.create()(ProEdit)