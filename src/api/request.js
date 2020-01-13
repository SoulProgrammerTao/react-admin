import axios from 'axios'
import { Message } from 'antd'

// 创建一个axios对象
const service = axios.create({
  baseURL: '', // 配置基础路径
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 20000 // 请求超时设置
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

export default function Request (url, data={}, type='GET') {
  const config = type === 'GET' ? {url, params: data} : { url, data, method: 'POST' }
  return new Promise((resolve, reject) => {
    service(config).then(res => {
      const result = res.data
      result.status === 0 ? resolve(result.data) : Message.error(result.msg)
    }).catch(err => {
      Message.error('请求出错了: ' + err.message)
    })
  })
}