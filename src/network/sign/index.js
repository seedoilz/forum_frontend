import request from '../request'

const API = require('@/apis')

export const register = data => request._post(API.REGISTER, data)
export const signIn = data => request._post(API.SIGN_IN, data)
export const signOut = config => request._get(API.SIGN_OUT, config)
export const messagePost = data => request._post(API.POST, data)
export const deletePost = config => request._post(API.DELETE, config)
