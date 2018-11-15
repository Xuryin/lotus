let baseUrl = 'https://fengmi.yangshopping.com/api'
const {Request} = require('./ajax')

// 获取用户session_key
export const getSessionId = (data) => {
    let obj = {
        url: '/user/getSessionId',
        data: data
    }
    return Request(obj)
}

// 提交用户信息
export const updateUser = (data) => {
    let obj = {
        url: '/user/updateUser',
        data: data
    }
    return Request(obj)
}

// 获取首页推荐商品信息
export const getRecommendList = (data) => {
    let obj = {
        url: '/goods/getRecommendList',
        data: data
    }
    return Request(obj)
}

// 获取分类信息
export const getList = (data) => {
    let obj = {
        url: '/category/getList',
        data: data
    }
    return Request(obj)
}

// 获取分类商品
export const getCategoryList = (data) => {
    let obj = {
        url: '/goods/getCategoryList',
        data: data
    }
    return Request(obj)
}

// 获取商品详情
export const getDetail = (data) => {
    let obj = {
        url: '/goods/getDetail',
        data: data
    }
    return Request(obj)
}
