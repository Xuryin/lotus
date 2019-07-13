// pages/authorization/authorization.js
const {setItem, isLogin} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSubmit: false,
        parent_id: 0,
        redirect_url: '/pages/index/index'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.parent_id) {
            this.setData({
                parent_id: options.parent_id
            })
        }
        if (options.redirect_url) {
            this.setData({
                redirect_url: options.redirect_url
            })
        }
    },
    getUserInfo () {},
    onGotUserInfo(e) {
        if (e.detail.userInfo) {
            setItem('userInfo', e.detail.userInfo)
            isLogin(this.data.parent_id,this.data.redirect_url)
        }
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

    }
})
