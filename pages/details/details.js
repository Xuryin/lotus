// pages/details/details.js
const app = getApp()
const {imgUrl} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods_id: "",
        goodsInfo: {},
        indicatorDots: true,
        autoPlay: true,
        interval: 10000,
        duration: 10000,
        imgUrls: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(options.id)
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

    getData(id) {
        app.ajaxMethods.getDetail({goods_id: id}).then(res => {
            if (res.code == 10000) {
                let images = res.data.images.split(',')
                let imgUrls = []
                images.map((v, k) => {
                    let item = imgUrl + v
                    imgUrls.push(item)
                })
                this.setData({
                    goodsInfo: res.data,
                    imgUrls: imgUrls
                })
            }
        })
    }
})
