import Request from './request'
import jsonp from 'jsonp'

// 登录
export const login = ({username, password}) => Request('/login', {username, password}, 'POST')
// 获取天气
export const getWeather = (city) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
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
    categoryId 父级ID
    categoryName 名称
  }
**/
export const categoryUpdate = (data) => Request('/manage/category/update', data, 'POST')
/**
  获取产品列表
  data: {
    pageNum
    pageSize
  }
**/
export const fetchProducts = (data) => Request('/manage/product/list', data)
/**
  添加商品
  |参数		       |是否必选 |类型     |说明
  |categoryId    |Y       |string   |分类ID
  |pCategoryId   |Y       |string   |父分类ID
  |name          |Y       |string   |商品名称
  |desc          |N       |string   |商品描述
  |price         |N       |string   |商品价格
  |detail        |N       |string   |商品详情
  |imgs          |N       |array   |商品图片名数组
**/
export const reqCreateProducts = (data) => Request('/manage/product/add', data, 'POST')
/**
  修改商品
  |参数		       |是否必选 |类型     |说明
  |_id           |Y       |string   |商品ID
  |categoryId    |Y       |string   |分类ID
  |pCategoryId   |Y       |string   |父分类ID
  |name          |Y       |string   |商品名称
  |desc          |N       |string   |商品描述
  |price         |N       |string   |商品价格
  |detail        |N       |string   |商品详情
  |imgs          |N       |array   |商品图片名数组
**/
export const reqUpdateProducts = (data) => Request('/manage/product/update', data, 'POST')
