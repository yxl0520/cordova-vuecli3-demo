<template>
  <div class="camera hasSidebar">
    <h1>{{ msg }}</h1>
    <h3>“引入插件方法”</h3>
    <p>cordova plugin add cordova-plugin-camera</p>
    <h3>“使用方法”</h3>
    <p>
      <b>1：</b>import Photo from '@/base/components/Photo'
    </p>
    <p>
      <b>2：</b>photo组件初始化：类型、名称、数量
    </p>
    <a
      href="http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html"
    >具体 回调方法 与 参数 设置</a>
    <h3>“例子”</h3>
    <!-- 拍照组件 -->
    <photo
      v-bind:photodata="photo"
      v-on:recPhoto="goPhoto"
    ></photo>
  </div>
</template>

<script>
// 引入Photo组件
import Photo from '@/base/components/Photo'
export default {
  name: 'camera',
  data() {
    return {
      msg: 'Camera功能',
      photo: {
        type: 'confirm',
        name: '照片组',
        num: 5
      },
      photos: []
    }
  },
  components: {
    Photo: Photo
  },
  methods: {
    // 返回的图片层
    goPhoto(datas) {
      // 上门确认照片组
      if (datas.type === 'confirm') {
        this.photos = datas.payload
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 0.6rem;
  padding: 0.2rem;
}

h2 {
  font-size: 0.4rem;
}

h3 {
  font-size: 0.35rem;
  color: #333333;
}

a {
  font-size: 0.3rem;
  color: #42b983;
  text-decoration: none;
}

p {
  font-size: 0.3rem;
  padding: 0.1rem;
  color: #666666;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
