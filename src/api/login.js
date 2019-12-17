import Request from './request'

export const login = data => Request('/login', data, 'POST')