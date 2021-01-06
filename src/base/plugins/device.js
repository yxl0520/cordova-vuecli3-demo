// 获取设备信息id
import VMT from '@/main'
/* global VMT,device:true */
const getDeviceid = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'provt') {
      VMT.$nativeApi.dataInteraction.getDeviceInfo().then(data => {
        // alert('data:' + JSON.stringify(data))
        resolve(data.deviceId)
      }).catch(err => {
        // alert('err:' + JSON.stringify(err))
        console.log(err)
        const deviceid = 'DEVICEERR' + parseInt(Math.random() * 100)
        reject(deviceid)
      })
    } else if (process.env.NODE_ENV === 'production') {
      resolve(device.uuid)
    } else {
      const deviceid = 'DEVICETEST' + parseInt(Math.random() * 100)
      reject(deviceid)
    }
  })
}

export default getDeviceid
