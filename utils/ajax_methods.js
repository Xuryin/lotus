let baseUrl = 'https://fengmi.yangshopping.com/api'
const Request = require('./ajax')

export const getSessionId = (data) => {
    Request('/getSessionId', data).then().catch()
}
