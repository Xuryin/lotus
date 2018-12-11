// pages/classify/classify.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classifyList: [],
        classifyId: 1,
        imgUrl: 'https://fengmi.yangshopping.com/',
        goodsList: [
            {
                id: 1,
                gname: '岩蜜纯蜜',
                good_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
            },
            {
                id: 2,
                gname: '岩蜜纯蜜',
                good_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
            },
            {
                id: 3,
                gname: '岩蜜纯蜜',
                good_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
            }
        ],
        title: '分类',
        classifyImgUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getClassifyLists()
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

    getClassifyLists () {
        app.ajaxMethods.getList().then(res => {
            if (res.code == 10000) {
                this.setData({
                    classifyList: res.data
                })
            }
        }).then(res => {
            this.getGoods(this.data.classifyList[0])
        })
    },

    selectedItem (e) {
        let id = e.currentTarget.dataset.item.id
        let item = e.currentTarget.dataset.item
        this.setData({classifyId: id})
        this.getGoods(item)
    },

    getGoods (item) {
        let img_url = item.img_url
        this.setData({
            classifyImgUrl: img_url
        })
        app.ajaxMethods.getCategoryList({category_id: item.id, page: 1}).then(res => {
            if (res.code == 10000) {
                this.setData({
                    goodsList: res.data
                })
            }
        })
    },

    showDetails (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/details/details?id=' + id,
        })
    }
})
