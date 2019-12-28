import Request from './request'
import jsonp from 'jsonp'
import {message} from 'antd'


export const login = data => Request('/login', data, 'POST')
export const getWeather = (city) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (data.status === 'success') {
        resolve(data.results[0].weather_data[0])
      } else {
        message.error('天气获取失败')
      }
    })
  })
}
