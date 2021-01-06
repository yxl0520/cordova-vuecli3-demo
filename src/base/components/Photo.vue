<!-- 拍照 组件 页面 -->
<template>
  <!-- 照片层 -->
  <div class="cont-box-item flex flex-c">
    <!-- 图片显示层 -->
    <div
      class="p-dialog flex flex-c"
      v-show="hide"
    >
      <div
        class="p-dialog-mask"
        v-on:click="imgClose"
      ></div>
      <div
        class="p-dialog-img"
        v-on:click="imgClose"
      >
        <img v-bind:src="clickimg" />
      </div>
    </div>
    <!-- 图片编辑层 -->
    <div
      class="p-dialog"
      v-show="drawhide"
    >
      <div class="p-dialog-mask sdraw"></div>
      <div class="p-dialog-tit flex flex-c">
        <span>图片编辑层</span>
      </div>
      <div
        class="p-dialog-img"
        v-bind:id="type+'_canvasImg'"
      ></div>
      <div class="p-dialog-btn flex flex-c flex-c-c">
        <button
          type="button"
          class="send-btn"
          v-bind:id="type+'_cleanImg'"
        >撤销操作</button>
        <button
          type="button"
          class="send-btn"
          v-bind:id="type+'_saveImg'"
        >生成图片</button>
      </div>
    </div>
    <!-- 图片选择层 -->
    <div
      class="p-dialog"
      v-show="showPhotoChoose"
    >
      <div
        class="p-dialog-mask p-dialog-chosse"
        v-on:click="photoCancel"
      ></div>
      <div class="p-dialog-actionsheet">
        <div class="p-dialog-actionsheet-menu">
          <div
            class="p-dialog-actionsheet-cell"
            v-on:click="photoFeedBack('1')"
          >拍照</div>
          <div
            class="p-dialog-actionsheet-cell"
            v-on:click="photoFeedBack('2')"
          >本地上传</div>
        </div>
        <div class="p-dialog-actionsheet-action">
          <div
            class="p-dialog-actionsheet-cell"
            v-on:click="photoCancel"
          >取消</div>
        </div>
      </div>
    </div>
    <span
      class="item-left flex-item-gsb-0"
      v-html="title"
    ></span>
    <span class="item-right flex-item-gsb-1">
      <ul class="pl-ul flex flex-c flex-wrap">
        <li
          v-for="(piname,index) in imageArr"
          :key="index"
          class="pl-li"
        >
          <span
            v-if="typeof piname.name != 'undefined'"
            class="pl-img"
          >
            <img
              v-bind:src="piname.basicSource"
              v-bind:imgname="piname.name"
              v-on:click="imgClick(piname.basicSource)"
              class="imgs"
            />
            <button
              type="button"
              v-on:click="photoDelete"
              class="pl-li-del icons-5 abs"
            ></button>
            <button
              type="button"
              class="add-photo none"
            >添加照片</button>
          </span>
          <span
            v-else
            class="pl-img"
          >
            <!-- <img
              src="../../assets/images/q-1.png"
              class="imgs none"
            />-->
            <button
              type="button"
              class="pl-li-del none icons-5 abs"
            ></button>
            <button
              type="button"
              v-on:click="photoOpen"
              class="add-photo"
            >添加照片</button>
          </span>
        </li>
        <li class="cb"></li>
      </ul>
    </span>
  </div>
</template>

<script>
/* global Camera device:true */
import picture from '@/base/plugins/picture'
import getDeviceid from '@/base/plugins/device'
import Dialog from '@/base/plugins/dialog'

export default {
  props: ['photodata'],
  created() {
    const vmt = this
    // 获取设备信息
    getDeviceid()
      .then((data) => {
        vmt.deviceid = data
      })
      .catch((e) => {
        vmt.deviceid = e
      })
  },
  data() {
    return {
      // 拍照标题
      title: this.photodata.name,
      // 限制数量
      nums: this.photodata.num,
      type: this.photodata.type,
      // 图片显示层
      hide: false,
      clickimg: '',
      // 图片编辑层
      drawhide: false,
      // 图片组
      imageArr: [''],
      // 图片名称组
      imgName: [],
      // 展示拍照选择
      showPhotoChoose: false,
      // 设备信息
      deviceid: ''
    }
  },
  methods: {
    // 新增图片
    photoOpen: function (event) {
      if (this.imageArr.length > this.nums) {
        Dialog.Alert('最多可上传' + this.nums + '张图', function () {})
        return
      }
      this.showPhotoChoose = true
      let pdc = document.querySelector('.p-dialog-chosse')
      let pda = document.querySelector('.p-dialog-actionsheet')
      pdc.classList.add('p-dialog-actionsheet-mask-enter-active')
      setTimeout(() => {
        pdc.classList.remove('p-dialog-actionsheet-mask-enter-active')
        pda.classList.add('p-dialog-toggle')
      }, 100)
    },
    // 取消选择图片
    photoCancel: function () {
      let pda = document.querySelector('.p-dialog-actionsheet')
      let pdc = document.querySelector('.p-dialog-chosse')
      pda.classList.remove('p-dialog-toggle')
      pdc.classList.add('p-dialog-actionsheet-mask-leave-active')
      setTimeout(() => {
        pdc.classList.remove('p-dialog-actionsheet-mask-leave-active')
        this.showPhotoChoose = false
      }, 200)
    },
    // 获取图片
    photoFeedBack: function (key) {
      const vmt = this
      // console.log(key, vmt.deviceid)
      // alert('test' + vmt.deviceid)
      // 关闭选择
      this.photoCancel()
      // 获取图片
      picture.selectPicture(key, (imgObj) => {
        // console.log('===获取图片===', imgObj)
        // 设置画布
        const canvas = document.createElement('canvas')

        const canvasImg = document.getElementById(vmt.type + '_canvasImg')
        canvasImg.appendChild(canvas)

        // 获取画布层
        let board = canvas.getContext('2d')
        // 显示图片编辑层
        vmt.drawhide = true
        // 获取图片并插入到画布
        let imgData = new Image()
        imgData.src = imgObj.base64Url
        imgData.onload = function () {
          // 设置画布宽高
          canvas.width = imgData.width
          canvas.height = imgData.height
          // 插入图片（当作画布背景图）
          board.drawImage(imgData, 0, 0)
        }
        // 初始化
        let mousePress = false
        let last = null

        // 开始画图
        function beginDraw() {
          mousePress = true
        }
        // 画图操作
        function drawing(event) {
          event.preventDefault()
          if (!mousePress) return
          let xy = pos(event)
          // console.log(JSON.stringify(xy))
          if (last != null) {
            // 设置画线宽度、颜色
            board.lineWidth = 1
            board.strokeStyle = '#f90606'
            board.beginPath()
            board.moveTo(last.x, last.y)
            board.lineTo(xy.x, xy.y)
            board.stroke()
          }
          last = xy
        }
        // 结束画图
        function endDraw(event) {
          event.preventDefault()
          mousePress = false
          last = null
        }
        // 获取当前x，y坐标点
        function pos(event) {
          let x, y, xi, yi
          if (isTouch(event)) {
            x = event.touches[0].clientX
            y = event.touches[0].clientY
            // console.log('touch', x, y)
          } else {
            x = event.offsetX + event.target.offsetLeft
            y = event.offsetY + event.target.offsetTop
            // console.log('mouse', x, y)
          }
          // 设置x,y坐标
          xi = x - (event.view.innerWidth - canvas.width) / 2
          yi = y - (event.view.innerHeight - canvas.height) / 2
          return {
            x: xi,
            y: yi
          }
        }
        // 是否可以触碰
        function isTouch(event) {
          let type = event.type
          if (type.indexOf('touch') >= 0) {
            return true
          } else {
            return false
          }
        }
        // 监听画布操作
        canvas.onmousedown = beginDraw
        canvas.onmousemove = drawing
        canvas.onmouseup = endDraw
        canvas.addEventListener('touchstart', beginDraw, true)
        canvas.addEventListener('touchmove', drawing, true)
        canvas.addEventListener('touchend', endDraw, true)

        // 撤销
        const clearImg = document.getElementById(vmt.type + '_cleanImg')
        clearImg.onclick = function () {
          board.clearRect(0, 0, canvas.width, canvas.height)
          board.drawImage(imgData, 0, 0)
        }

        // 保存
        const saveImg = document.getElementById(vmt.type + '_saveImg')
        saveImg.onclick = function () {
          // 生成base64图片
          const dataUrl = canvas.toDataURL('image/jpeg')
          // alert(process.env.NODE_ENV + '===' + vmt.deviceid)
          const filename =
            vmt.deviceid +
            't' +
            new Date().getTime() +
            's' +
            parseInt(Math.random() * 100) +
            '.jpg'
          canvas.remove()
          // 存储图片
          const data = {
            name: filename,
            basicSource: dataUrl
          }
          vmt.imgName.splice(0, 0, filename)
          vmt.imageArr.splice(0, 0, data)
          // 隐藏
          vmt.drawhide = false
          // 提交到外层
          const datas = {
            type: vmt.type,
            payload: vmt.imageArr
          }
          vmt.$emit('recPhoto', datas)
          // console.log('名称：', vmt.imgName, '数组：', JSON.stringify(vmt.imageArr))
        }
      })
    },
    // 删除图片
    photoDelete: function (event) {
      // console.log(event, '删除图片')
      let vmt = this
      let _event = event.target
      // 提示用户操作
      Dialog.Confirm('确定删除当前图片吗？', function (res) {
        // 确认按钮
        if (res) {
          // 获取当前图片组相片名称
          let _iname = _event.previousElementSibling.getAttribute('imgname')
          let _index = vmt.imgName.indexOf(_iname)
          // console.log('删除', _iname, _index)
          // 根据相片名称删除相片数组的值
          if (_index > -1) {
            vmt.imgName.splice(_index, 1)
            vmt.imageArr.splice(_index, 1)
            // 提交到外层
            const datas = {
              type: vmt.type,
              payload: vmt.imageArr
            }
            vmt.$emit('recPhoto', datas)
          }
          // console.log('删除后名称', vmt.imgName, '删除后数组', JSON.stringify(vmt.imageArr))
        }
      })
    },
    // 点击看大图
    imgClick(imgs) {
      this.hide = !this.hide
      this.clickimg = imgs
    },
    // 关闭看大图
    imgClose() {
      this.hide = !this.hide
    }
  }
}
</script>

<style>
.cont-box-item b {
  color: #cd3d3d !important;
}
</style>

<style scoped>
.cont-box-item {
  border-bottom: 0.01rem solid #eeeeee;
}
.cont-box-item:last-child {
  border: 0;
}
.cont-box-item .item-left {
  line-height: 0.8rem;
  margin-left: 0.3rem;
  padding-right: 0.1rem;
}
.cont-box-item .item-right {
  line-height: 0.4rem;
  padding: 0.2rem 0;
  margin-right: 0.3rem;
}

.cont-box-item .pl-ul .none {
  display: none;
}

.cont-box-item .pl-li .pl-img {
  position: relative;
  width: 1.28rem;
  height: 1.28rem;
  margin: 0 0.1rem 0.1rem 0.05rem;
  display: inline-block;
  max-width: none;
  max-height: none;
  overflow: hidden;
  z-index: 2;
}
.cont-box-item .pl-img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 100%;
  max-width: none;
  max-height: none;
  z-index: 3;
}

.cont-box-item .pl-li-del {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
}
.cont-box-item .add-photo {
  z-index: 1;
}

.p-dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.p-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.9;
  z-index: 100;
}
.sdraw {
  opacity: 1;
}
.p-dialog-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 100;
}
.p-dialog-tit {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: #cd3d3d;
  z-index: 100;
}
.p-dialog-tit span {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.34rem;
  text-align: center;
  color: #ffffff;
}
.p-dialog-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0.2rem 0;
  background: #ffffff;
  z-index: 100;
}
.p-dialog-btn .send-btn {
  width: 46%;
  margin: 0 1%;
  height: 0.8rem;
  background-color: #999 !important;
  color: #fff !important;
}

.p-dialog-chosse {
  background: rgba(0, 0, 0, 0.6);
}

.p-dialog-actionsheet {
  position: fixed;
  left: 0;
  bottom: 0;
  -webkit-transform: translate(0, 100%);
  transform: translate(0, 100%);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 5000;
  width: 100%;
  background-color: #efeff4;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}

.p-dialog-toggle {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}

.p-dialog-actionsheet-menu {
  background-color: #ffffff;
}

.p-dialog-actionsheet-action {
  margin-top: 0.2rem;
  background-color: #ffffff;
}

.p-dialog-actionsheet-cell {
  position: relative;
  padding: 0.2rem 0;
  text-align: center;
  font-size: 16px;
}

.p-dialog-actionsheet-menu .p-dialog-actionsheet-cell {
  border-bottom: 0.01rem solid #eeeeee;
}

.p-dialog-actionsheet-mask-enter,
.p-dialog-actionsheet-mask-leave-active {
  opacity: 0;
}
.p-dialog-actionsheet-mask-leave-active,
.p-dialog-actionsheet-mask-enter-active {
  -webkit-transition: opacity 300ms !important;
  transition: opacity 300ms !important;
}
</style>
