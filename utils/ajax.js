let baseUrl = 'https://fengmi.yangshopping.com/api'
const app = getApp()

let Request = function (obj) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: baseUrl + obj.url,
            data: obj.data,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                //'X-MERCHANT': merchantId,
                //'token': wx.getStorageSync('token'),
                'SES-KEY': wx.getStorageSync('session_key'),
                'X-TOKEN': wx.getStorageSync('token')
            },
            method: obj.method == undefined ? "post" : obj.method,
            success: res => {
                // 回调成功执行resolve            resolve(data)
                resolve(res.data)
            },
            fail: res => {            // 回调失败时
                if (typeof reject == 'function') {
                    reject(res);
                } else {
                    console.log(res);
                }
            },
        })
    })
}    // 执行req 方法,传入第一个请求,

module.exports = {
    Request: Request
}

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

