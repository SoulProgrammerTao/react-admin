import Request from './request'
import jsonp from 'jsonp'
import {message} from 'antd'

// 登录
export const login = ({username, password}) => Request('/login', {username, password}, 'POST')
// 获取天气
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
// 获取分类列表
export const categoryList = parentId => Request('/manage/category/list', {parentId})
/**
  添加分类
  data: {
    parentId 父级ID
    categoryName 名称
  }
**/
export const categoryAdd = data => Request('/manage/category/add', data, 'POST')
/**
  修改分类
  data: {
    parentId 父级ID
    categoryName 名称
  }
**/
// 修改分类
export const categoryUpdate = (data) => Request('/manage/category/update', data, 'POST')
