// pages/collection/collection.js
const app = getApp()
const {imgUrl} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '我的收藏',
        collectionData: [],
        imgUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getData()
        this.setData({imgUrl: imgUrl})
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getData () {
        app.ajaxMethods.getCollection().then(res => {
            console.log(res.code)
            if (res.code == 10000) {
                console.log(res.data)
                this.setData({collectionData: res.data})
            }
        })
    },

    goForDetails (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/details/details?id=' + id,
        })
    }

})
