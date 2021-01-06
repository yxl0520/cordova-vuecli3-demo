// 弹窗方法api
const Alert = (title, func) => {
  const titl = title
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'provt') {
    navigator.notification.alert(titl, func, '', '确定');
  } else {
    window.alert(titl)
    func()
  }
}

const Confirm = (title, func) => {
  const tit = title
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'provt') {
    navigator.notification.confirm(tit, function (buttonIndex) {
      if (buttonIndex == 1) {
        func(true)
      } else {
        func(false)
      }
    }, '', ['确定', '取消'])
  } else {
    let res = window.confirm(tit)
    if (res) {
      func(true)
    } else {
      func(false)
    }
  }
}

export default {
  Alert,
  Confirm
}
