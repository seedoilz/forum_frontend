import request from '../request'

const API = require('@/apis')

export const register = data => request._post(API.REGISTER, data)
export const signIn = data => request._post(API.SIGN_IN, data)
export const signOut = config => request._get(API.SIGN_OUT, config)
export const messagePost = data => request._post(API.POST, data)
export const deletePost = config => request._post(API.DELETE, config)
export const getCurrentUser = () => request._get(API.GET_CURRENT_USER)
export const updateUser = data => request._post(API.UPDATE_USER, data)
export const findUserById = config => request._get(API.FIND_USER_BY_ID, config)
export const findPostList = data => request._post(API.FIND_POST_LIST, data)
export const postDetailById = config => request._get(API.POST_DETAIL_BY_ID, config)
export const commentByPostId = config => request._get(API.COMMENT_BY_POST_ID, config)
