Page({
    data: {
        current: 'tab1',
        tabs: [
            {
                key: 'tab1',
                title: '积分商品',
                content: 'Content of tab 1',
            },
            {
                key: 'tab2',
                title: '我的兑换',
                content: 'Content of tab 2',
            }
        ],
        title: '我的积分',
        integral: 500
    },
    onChange(e) {
        console.log('onChange', e)
        this.setData({
            current: e.detail.key,
        })
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
})
