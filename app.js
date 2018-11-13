//app.js
const {isLogin, setItem, checkSession} = require('./utils/util')

App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                let openId = res.code
                // console.log(openId)
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // console.log(res.userInfo)
                            setItem('userInfo', res.userInfo).then(() => {
                                console.log(789)
                                checkSession().then().catch(() => {
                                    isLogin()
                                })
                            })
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况a
                            if (this.userInfoReadyCallback) {
                                console.log(this.userInfoReadyCallback(res))
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/authorization/authorization',
                        success: res => {},
                        fail: res => {}
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})
