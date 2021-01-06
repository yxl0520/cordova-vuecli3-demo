// 获取图片方法api
const imgPackageHeader = 'data:image/jpeg;base64,'
// #region 默认图片
const imgDefaultBase64Code = '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'
// #endregion
const destinationTypes = {
  THUMB_URL_AND_FILE_URI: -1, // 非cordova自带类型, 返回略缩图和原图的url的json对象
  DATA_URL: 0, // Return image as base64-encoded string
  FILE_URI: 1, // Return image file URI
  NATIVE_URI: 2 // Return image native URI (e.g. assets-library:// on iOS or content:// on Android)
}

const Camera = window.Camera = {}

Camera.DestinationType = {
  THUMB_URL_AND_FILE_URI: -1, // 非cordova自带类型, 返回略缩图和原图的url的json对象
  DATA_URL: 0, // Return image as base64-encoded string
  FILE_URI: 1, // Return image file URI
  NATIVE_URI: 2 // Return image native URI (e.g. assets-library:// on iOS or content:// on Android)
}
Camera.PictureSourceType = {
  PHOTOLIBRARY: 0,
  CAMERA: 1,
  SAVEDPHOTOALBUM: 2
}
Camera.EncodingType = {
  JPEG: 0, // Return JPEG encoded image
  PNG: 1 // Return PNG encoded image
}
Camera.MediaType = {
  PICTURE: 0, // allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
  VIDEO: 1, // allow selection of video only, WILL ALWAYS RETURN FILE_URI
  ALLMEDIA: 2 // allow selection from all media types
}
Camera.Direction = {
  BACK: 0, // Use the back-facing camera
  FRONT: 1 // Use the front-facing camera
}

// 获取图片方法
var getPicture = function (type, params, feedback) {
  params = params || {}
  var quality = params.hasOwnProperty('quality') ? params.quality : 100
  var allowEdit = params.hasOwnProperty('allowEdit') ? params.allowEdit : false
  var saveToPhotoAlbum = params.hasOwnProperty('saveToPhotoAlbum') ? params.saveToPhotoAlbum : false

  if (!window.cordova) {
    console.log('非发布环境，用本地图片代替')
    feedback({
      base64Code: imgDefaultBase64Code,
      base64Url: imgPackageHeader + imgDefaultBase64Code
    })
  } else {
    // 官网：https://github.com/apache/cordova-plugin-camera#readme
    console.log('发布环境，调用拍照接口')
    // SEGI兼容在这边做
    navigator.camera.getPicture(function (data) {
      feedback({
        base64Code: data,
        base64Url: imgPackageHeader + data
      })
    }, function (msg) {
      console.log('拍照失败原因:', msg)
    }, {
      quality: quality,
      destinationType: destinationTypes.DATA_URL,
      allowEdit: allowEdit,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 2560,
      targetHeight: 1600,
      // targetWidth: 375,
      // targetHeight: 667,
      saveToPhotoAlbum: saveToPhotoAlbum,
      sourceType: type,
      mediaType: Camera.MediaType.PICTURE,
      correctOrientation: true,
      cameraDirection: Camera.Direction.BACK
    })
  }
}

// 获取图片方式
var selectPicture = function (key, feedback) {
  let maxNum = 1
  let isSingle = true
  let quality = 100
  let allowEdit = false
  let saveToPhotoAlbum = false
  let noneSelect = false
  let widthRate = 1
  let heightRate = 1
  let maxWidth = 2560
  let maxHeight = 1600

  let params = {
    isSingle: isSingle,
    maxNum: maxNum,
    quality: quality,
    allowEdit: allowEdit,
    saveToPhotoAlbum: saveToPhotoAlbum,
    noneSelect: noneSelect,
    widthRate: widthRate,
    heightRate: heightRate,
    maxWidth: maxWidth,
    maxHeight: maxHeight
  }

  if (key === '1') {
    getPicture(Camera.PictureSourceType.CAMERA, params, feedback)
  } else if (key === '2') {
    getPicture(Camera.PictureSourceType.SAVEDPHOTOALBUM, params, feedback)
  }
}

var urlEncodeForBase64Code = function (base64Code) {
  return base64Code ? base64Code.replace(/\+/g, '%2B') : ''
}

export default {
  selectPicture: selectPicture,
  urlEncodeForBase64Code: urlEncodeForBase64Code
}
