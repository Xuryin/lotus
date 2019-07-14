//index.js
//获取应用实例
const app = getApp()
const {toast} = require('../../utils/util')
Page({
    data: {
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrl: 'https://mini.daodaoshop.com/',
        goodsData: [
            {
                name: "hehehehehe",
                key: 1,
                price: 500,
                img:  'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                collected:false
            },
            {
                name: "hahahahah",
                key: 2,
                price: 288,
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                collected: true
            },
            {
                name: "huhuhuhu",
                key: 3,
                price: 199,
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                collected: false
            }
        ],
        indicatorDots: false,
        title: '今日推荐'
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        this.getGoodsList()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    getGoodsList () {
        app.ajaxMethods.getRecommendList().then(res => {
            this.setData({
                goodsData: res.data
            })
        })
    },
    changeCollection (e) {
        // 添加收藏
        let id = e.currentTarget.dataset.id
        let type = e.currentTarget.dataset.type
        let op = {
            goods_id: id,
            opt: type
        }
        app.ajaxMethods.collect(op).then(res => {
            if (res.code == 10000) {
                type == 'cancel' ? toast('取消成功') : toast('收藏成功')
            }
        }).then(() => {
            this.getGoodsList()
        })
    },
    goForDetails (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/details/details?id=' + id,
        })
    }
})
