let baseUrl = 'https://fengmi.yangshopping.com/api'
const app = getApp()

let Request = function (obj) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: baseUrl + obj.url,
            data: obj.data,
            header: obj.header,
            method: obj.method == undefined ? "get" : obj.method,
            success: function (data) {            // 回调成功执行resolve            resolve(data)
            },
            fail: function (data) {            // 回调失败时
                if (typeof reject == 'function') {
                    reject(data);
                } else {
                    console.log(data);
                }
            },
        })
    })
}    // 执行req 方法,传入第一个请求,

module.exports.Request = Request

// let req1 = Request({
//     url: '第一次请求链接,与baseUrlPromise 相结合',
//     data: {},
// })    // 当需要多次请求时加入

/*req1.then(function (data) {
    console.log('promiseThen1')
    console.log(data);
    return Request({
        url: '第二次请求链接',
    })
}).then(function (data) {
    console.log('promiseThen3')
    console.log(data);
    return Request({
        url: '第三次请求链接'
    })
}).then().catch(function (data) {
    console.log(PromiseCatch)
})*/

