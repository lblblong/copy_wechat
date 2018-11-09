<template>
  <div id="message_img">
    <div class="content">
      <img src="https://newimg88.b0.upaiyun.com/newimg88/2017/11/clipping-and-masking.jpg" alt="">
    </div>
    <div class="arrows" :class="_direction">
      <img src="https://newimg88.b0.upaiyun.com/newimg88/2017/11/clipping-and-masking.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['img', 'direction'],
  computed: {
    _direction() {
      return this.direction == 2 ? 'left' : 'right'
    }
  }
}
</script>

<style scoped lang="scss">
#message_img {
  position: relative;
  margin: 100px;
  .content {
    display: inline-block;
    position: relative;
    border-radius: 4px;
    max-width: 200px;
    img {
      width: 100%;
    }
  }
  .arrows {
    position: absolute;
    top: 12px;
    width: 0;
    height: 0;
    border: 5px solid;
  }

  .left {
    left: -10px;
    border-color: #f5f5f5 transparent #f5f5f5 #f5f5f5;
  }

  .right {
    right: -10px;
    border-color: #f5f5f5 #f5f5f5 #f5f5f5 transparent;
  }
}
</style>