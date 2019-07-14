// pages/addComment/addComment.js
const app = getApp()
const {toast, imgUrl, setItem, getItem} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsData: {},
        title: '填写评价',
        formData: [],
        rateText: '请打分',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let item = getItem('goodsData')
        console.log(item)
        this.setData({goodsData: item, imgUrl: imgUrl})
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

    addContent(e) {
        console.log(e.detail.value)
        let formData = this.data.formData
        formData['content'] = e.detail.value
        formData['goods_id'] = this.data.goodsData.goods_list[0].goods_id
        this.setData({formData: formData})

    },

    submitComment() {
        if (this.data.formData.content == "" ) {
            toast("评论内容不能为空")
        }
        let formData = this.data.formData;
        formData['order_id'] = this.data.goodsData.order_id;
        app.ajaxMethods.addGoodsComment(this.data.formData).then(res => {
            if (res.code == 10000) {
                toast("添加评论成功")
                // wx.navigateTo({
                //     url: '../orderList/orderList'
                // })
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    // 打分
    onChange(e) {
        console.log(e.detail)
        let rate = e.detail
        let rateText = ""
        let formData = this.data.formData
        formData['rate'] = rate
        switch (rate) {
            case 1:
                rateText = '有点差哦'
                break;
            case 2:
                rateText =  '继续努力'
                break;
            case 3:
                rateText = '一般'
                break;
            case 4 :
                rateText =  '很好'
                break;
            case 5:
                rateText = '非常好'
                break;
        }
        console.log(rateText)
        this.setData({formData: formData, rateText: rateText})
    }
})
