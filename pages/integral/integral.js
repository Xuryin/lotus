const app = getApp()
const {imgUrl, toast} = require('../../utils/util')
Page({
    data: {
        active: 1,
        title: '我的积分',
        integral: 500,
        index: 0,
        integralList: [],
        changeList: [],
        imgUrl: '',
        show: false,
        checkedGoods: {}, // 选中要兑换的商品
        stockTop: 100,
        cartValue: 1,
        totalIntegral: 100,
        addressId: null
    },
    onLoad: function (options) {
        this.setData({imgUrl: imgUrl})
        console.log(options.id)
        if (options.id) {
            this.setData({addressId: options.id})
        }
    },
    onShow () {
        this.getIntegralList()
        this.getIntegral()
        this.getAddressData()
    },
    onChange(event) {
        let index = event.detail.index
        console.log(index)
        this.setData({index: index})
        index ? this.getChangeList() : this.getIntegralList()
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

    getIntegralList () {
        app.ajaxMethods.integralList().then(res => {
            if (res.code == 10000) {
                this.setData({
                    integralList: res.data
                })
            }
        })
    },

    getChangeList () {
        console.log('我的兑换')
        app.ajaxMethods.changedGoodsList({page: 1}).then(res => {
            if (res.code == 10000) {
                this.setData({changeList: res.data})
            }
        })
    },

    openPop (e) {
        let item = e.currentTarget.dataset.item
        this.setData({ show: true, checkedGoods: item, stockTop: item.stock, totalIntegral:item.price })
    },

    onClose () {
        this.setData({ show: false })
    },

    changeGoods (e) {
        let id = this.data.checkedGoods.id
        app.ajaxMethods.changeIntegral({integral_id: id, address_id: this.data.addressData[0].id}).then(res => {
            if (res.code == 10000) {
                toast('兑换成功')
            } else {
                toast(res.message)
            }
        }).then(() => {
            this.setData({show: false})
        })
    },

    changNumber (event) {
        let total = event.detail * this.data.checkedGoods.price
        this.setData({cartValue: event.detail, totalIntegral: total})
    },

    getIntegral () {
        // 获取可用积分
        app.ajaxMethods.getIntegral().then(res => {
            if (res.code == 10000) {
                this.setData({integral: res.data})
            }
        })
    },

    getAddressData() {
        app.ajaxMethods.getAddressList().then(res => {
            if (res.code == 10000) {
                if (this.data.addressId) {
                    let addressArray = []
                    res.data.map((item) => {
                        if (this.data.addressId == item.id) {
                            addressArray.push(item)
                            this.setData({addressData: addressArray})
                        }
                    })
                } else {
                    this.setData({addressData: res.data})
                }
            }
        })
    },

    changeAddress (e) {
        wx.navigateTo({
            url: `/pages/address/address?page=integral`,
            success: res => {},
            fail: res => {}
        })
    }
})
