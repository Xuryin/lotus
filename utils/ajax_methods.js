let baseUrl = 'https://fengmi.yangshopping.com/api'
const {Request} = require('./ajax')

export const getSessionId = (data) => {
    let obj = {
        url: '/user/getSessionId',
        data: data
    }
    return Request(obj)
}

export const updateUser = (data) => {
    let obj = {
        url: '/user/updateUser',
        data: data
    }
    return Request(obj)
}
