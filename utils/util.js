const {getSessionId, updateUser} = require('./ajax_methods')
const  imgUrl = 'https://fengmi.yangshopping.com/'
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const setItem = (key, val) => {
    return new Promise((resolve, reject) => {
        wx.setStorage({
            key: key,
            data: val,
            success: (res) => {
                resolve()
            }
        })
    })
}

const getItem = (key) => {
    return wx.getStorageSync(key)
}

const routerTo = (path) => {
    wx.reLaunch({
        url: path,
        success: res => {},
        fail: res => {}
    })
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const checkSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: res => {
                console.log('checksession success')
                resolve()
            },
            fail: res => {
                console.log(456);
                isLogin();
            }
        })
    })
}

const isLogin = (parent_id = 0,path = '/pages/index/index') => {
    wx.login({
        success: res => {
            let code = res.code
            console.log(res.code)
            uploadCode(code, parent_id,path)
        }
    })
}

const uploadCode = (code, parent_id,path) => {
    getSessionId({code: code,parent_id: parent_id}).then(res => {
        if (res.code == 10000) {
            setItem("session_key", res.data.session_key)
            setItem("auth_id", res.data.auth_id)
            let userInfo = getItem('userInfo')
            UploadUserInfo(userInfo,path)
        }
    })
}

const UploadUserInfo = (data, path) => {
    let obj = {
        nick_name: data.nickName,
        img_url: data.avatarUrl
    }
    updateUser(obj).then(res => {
        routerTo(path)
    })
}

const toast = (msg, type = 'none') => {
    let duration
    if (msg.length > 15) {
        duration = 3000
    } else if (msg.length < 15 && msg.length > 4) {
        duration = parseInt(msg.length) * 200
    } else {
        duration = 1500
    }
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: msg,
            duration: duration,
            icon: type,
            success: (res) => {
                resolve()
            }
        })
    })
}

module.exports = {
    formatTime: formatTime,
    isLogin: isLogin,
    setItem: setItem,
    getItem: getItem,
    checkSession: checkSession,
    toast: toast,
    imgUrl: imgUrl
}
