import request from '../request'

const API = require('@/apis')

export const register = data => request._post(API.REGISTER, data)
export const signIn = data => request._post(API.SIGN_IN, data)
export const signOut = config => request._get(API.SIGN_OUT, config)
export const messagePost = data => request._post(API.ADD_POST, data)
export const deletePost = config => request._post(API.DELETE_POST, null, config)
export const getCurrentUser = () => request._get(API.GET_CURRENT_USER)
export const updateUser = data => request._post(API.UPDATE_USER, data)
export const findUserById = config => request._get(API.FIND_USER_BY_ID, config)
export const findPostList = (data, config) => request._post(API.FIND_POST_LIST, data, config)
export const postDetailById = config => request._get(API.POST_DETAIL_BY_ID, config)
export const commentByPostId = config => request._get(API.COMMENT_BY_POST_ID, config)
export const comment = data => request._post(API.ADD_COMMENT, data)
export const collection = data => request._post(API.ADD_COLLECTOIN, data)
export const userCollection = config => request._get(API.USER_COLLECTION, config)
export const delCollection = config => request._get(API.DEL_COLLECTION, config)
export const commentThumb = config => request._get(API.COMMENT_THUMB, config)
export const userCommentThumbs = config => request._get(API.USER_COMMENT_THUMBS, config)
export const cancelCommentThumb = config => request._get(API.CANCEL_COMMENT_THUMB, config)
export const postsByTag = (data, config) => request._post(API.POSTS_BY_TAG, data, config)
export const addImage = data => request._post(API.ADD_IMAGE, data)
export const listMessage = config => request._get(API.LIST_MESSAGE, config)
export const listAllMessage = config => request._get(API.LIST_ALL_MESSAGE, config)
export const updateMessage = config => request._get(API.UPDATE_MESSAGE, config)
export const updateAllMessage = config => request._get(API.UPDATE_ALL_MESSAGE, config)
export const querySearch = config => request._get(API.QUERY_SEARCH, config)
export const postSearch = (data, config) => request._post(API.POSTS_SEARCH, data, config)
