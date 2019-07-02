//index.js
//获取应用实例
const app = getApp()
const{getItem} = require('../../utils/util')

Page({
    data: {
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userInfo: {},
        goodsGroup: [
            {
                url: '../../static/images/wallet.png',
                text: '待付款',
                tab: 0
            },
            {
                url: '../../static/images/receive.png',
                text: '待发货',
                tab: 1
            },
            {
                url: '../../static/images/car.png',
                text: '待收货',
                tab: 2
            },
            {
                url: '../../static/images/_judges.png',
                text: '待评价',
                tab: 3
            },
            {
                url: '../../static/images/order.png',
                text: '已完成',
                tab: 4
            },
        ],
        infoList: [
            {
                extra: '我的积分',
                url: '/pages/integral/integral'
            },
            {
                extra: '我的优惠券',
                url: '/pages/coupon/coupon'
            },
            {
                extra: '我的收藏',
                url: '/pages/collection/collection'
            },
            {
                extra: '收货地址',
                url: '/pages/address/address'
            },
            {
                extra: '学习社区',
                url: '/pages/learn/learn'
            },
            {
                extra: '关于我们',
                url: '/pages/about/about'
            },
        ]
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        let userInfo = getItem('userInfo')
        console.log(userInfo)
        this.setData({
            userInfo: userInfo
        })
    },
    routerTo (e) {
        let router = e.currentTarget.dataset.router
        let tab = e.currentTarget.dataset.tab, url
        if (tab) {
            url = `${router}?tab=${tab}`
        } else {
            url = router
        }
        wx.navigateTo({
            url: url,
            success: res => {},
            fail: res => {}
        })
    }
})
