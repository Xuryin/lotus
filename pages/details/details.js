// pages/details/details.js
const app = getApp()
const {imgUrl, toast} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods_id: "",
        goodsInfo: {},
        indicatorDots: true,
        autoPlay: false,
        interval: 1500,
        duration: 1500,
        imgUrls: [],
        imgUrl: '', // api的地址
        title: '',
        active: 0,
        imagesContent: [],
        judgeContent: [],
        tab: 0,
        show: false,
        cartValue: 1,
        stockTop: 1, //当前规格的库存
        specificationId: null, // 选中的规格
        specificationList: [],
        checkedGoods: {}, // 选中的产品规格
        addCartData: {
            id: null,
            goods_stock_id: null,
            number: null
        }, // 加入购物车的数据
        buttonType: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(options.id)
        // this.getData(1)
        this.getGoodsStock(options.id)
        this.setData({goods_id: options.id, imgUrl: imgUrl})
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
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '自定义转发标题',
            path: '/page/details/details?id=' + this.data.goods_id
        }
    },

    getData(id) {
        app.ajaxMethods.getDetail({goods_id: id}).then(res => {
            if (res.code == 10000) {
                let images = res.data.images.split(',')
                let imagesContent = res.data.content.split(',')
                this.setData({
                    goodsInfo: res.data,
                    imgUrls: images,
                    imagesContent: imagesContent,
                    title: res.data.gname
                })
            }
        })
    },

    changeCollection (e) {
        // 添加收藏
        let type = e.currentTarget.dataset.type
        let op = {
            goods_id: this.data.goods_id,
            opt: type
        }
        app.ajaxMethods.collect(op).then(res => {
            if (res.code == 10000) {
                type == 'cancel' ? toast('取消成功') : toast('收藏成功')
            }
        }).then(() => {
            this.getData(this.data.goods_id)
        })
    },

    onChange(event) {
        let index = event.detail.index
        this.setData({tab: event.detail.index})
        index == 1 ? this.getJudge() : this.getData(this.data.goods_id)
    },

    onTabsChange(e) {
        console.log('onTabsChange', e)
        const { key } = e.detail
        const index = this.data.tabs.map((n) => n.key).indexOf(key)

        this.setData({
            key,
            index,
        })
    },
    onSwiperChange(e) {
        console.log('onSwiperChange', e)
        const { current: index, source } = e.detail
        const { key } = this.data.tabs[index]

        if (!!source) {
            this.setData({
                key,
                index,
            })
        }
    },

    getJudge () {
        let op = {}
        op.goods_id = this.data.goods_id
        op.page = 1
        app.ajaxMethods.getMoreComment(op).then(res => {
            if (res.code == 10000) {
                console.log(res.data)
                this.setData({judgeContent: res.data})
            }
        })
    },

    openPop (e) {
        let type = e.currentTarget.dataset.type
        this.setData({buttonType: type})
        this.setData({ show: true })
    },

    onClose () {
        this.setData({ show: false })
    },

    // 获取商品规格
    getGoodsStock (id) {
        app.ajaxMethods.getGoodsStock({goods_id: id}).then(res => {
            if (res.code == 10000) {
                this.setData({specificationList: res.data})
                let item = res.data[0]
                this.setData({specificationId: item.id, stockTop: item.stock, cartValue: 1, checkedGoods: item})
            }
        })
    },

    // 选择产品规格
    checkStock (e) {
        let item = e.currentTarget.dataset.item
        this.setData({specificationId: item.id, stockTop: item.stock, cartValue: 1, checkedGoods: item})
    },

    changNumber (event) {
        this.setData({cartValue: event.detail})
    },

    addCart (e, id = "") {
        app.ajaxMethods.cartSave({number: this.data.cartValue, goods_stock_id: this.data.specificationId, id: id})
            .then(res => {
                if (res.code == 10000) {
                    toast("添加成功")
                    this.onClose()
                } else {
                    toast(res.msg)
                }
            })
    }

})
