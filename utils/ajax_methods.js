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

// 获取购物车列表
export const getCartList = (data) => {
    let obj = {
        url: '/cart/getList',
        data: data
    }
    return Request(obj)
}

// 获取行政地区(省,市,区)
export const getArea = (data) => {
    let obj = {
        url: '/district/getList',
        data: data
    }
    return Request(obj)
}

// 保存地址,修改地址
export const addressSave = (data) => {
    let obj = {
        url: '/address/save',
        data: data
    }
    return Request(obj)
}

// 获取收货地址列表
export const getAddressList = (data) => {
    let obj = {
        url: '/user/getAddressList',
        data: data
    }
    return Request(obj)
}
