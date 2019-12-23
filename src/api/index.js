import Request from './request'
import jsonp from 'jsonp'
import {message} from 'antd'


export const login = data => Request('/login', data, 'POST')
