<template>
  <div class="demo">
    <div
      v-for="(item, i) in list"
      :key="i"
      :class="['demo-item-box']"
      @click="clickItem(i, item.routeName)"
    >
      <h2 class="title">{{item.title}}</h2>
      <p v-if="item.desc">{{item.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: 'Camera',
          routeName: 'Camera',
          desc: '调用相机'
        }
      ]
    }
  },
  methods: {
    clickItem(index, routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style lang="less" scoped>
.demo {
  width: 100%;
  font-size: 16px;
}
.demo-item-box {
  width: 80%;
  padding: 4px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  margin: 0 auto;
  h2 {
    font-size: 24px;
  }
  p {
    font-size: 16px;
  }
}
</style>