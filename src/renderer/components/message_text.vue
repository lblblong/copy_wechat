<template>
  <div id="message_text">
    <div class="content">
      {{msg}}
      <div class="arrows" :class="_direction">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg', 'direction'],
  computed: {
    _direction() {
      return this.direction == 2 ? 'left' : 'right'
    }
  }
}
</script>

<style scoped lang="scss">
#message_text {
  .content {
    display: inline-block;
    position: relative;
    height: 35px;
    border-radius: 4px;
    background-color: #9eea6a;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
    .arrows {
      position: absolute;
      top: 12px;
      width: 0;
      height: 0;
      border: 5px solid;
    }

    .left {
      left: -10px;
      border-color: transparent #9eea6a transparent transparent;
    }

    .right {
      right: -10px;
      border-color: transparent transparent transparent #9eea6a;
    }
  }
}
</style>