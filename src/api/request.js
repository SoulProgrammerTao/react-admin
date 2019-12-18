import axios from 'axios'
import { Message } from 'antd'

export default function Request (url, data={}, type='GET') {
  const config = type === 'GET' ? {url, params: data} : { url, data, method: 'POST' }
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      resolve(res.data)
    }).catch(err => {
      Message.error('请求出错了: ' + err.message)
    })
  })
}