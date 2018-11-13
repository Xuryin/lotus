const {getSessionId, updateUser} = require('./ajax_methods')

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
            data: JSON.stringify(val),
            success: (res) => {
                resolve()
            }
        })
    })
}

const getItem = (key) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: key,
            success: (res) => {
                console.log(res)
                return JSON.parse(res)
            }
        })
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
                resolve()
                console.log(123)
            },
            fail: res => {
                console.log(456);
                isLogin();
            }
        })
    })
}

const isLogin = (up) => {
    wx.login({
        success: res => {
            let code = res.code
            console.log(res.code)
            uploadCode(code, up)
        }
    })
}

const uploadCode = (code, up) => {
    getSessionId({code: code}).then(res => {
        console.log(res)
        setItem("session_key", res.session_key)
        // setUserInfo(res)
    })
}

const setUserInfo = (data, up) => {
    let obj = {
        nick_name: data.nickName,
        img_url: data.avatarUrl
    }
    updateUser(obj).then(res => {
        console.log(res)
    })
}

module.exports = {
    formatTime: formatTime,
    isLogin: isLogin,
    setItem: setItem,
    getItem: getItem,
    checkSession: checkSession
}
