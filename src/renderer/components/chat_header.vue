<template>
  <div id="chat_header">
    <div class="name">
      <div>文件传输助手</div>
    </div>
    <div class="actions" style="-webkit-app-region: no-drag">
      <div class="toolbar">
        <div>
          <span class="icon-fixation"></span>
        </div>
        <div>
          <span class="icon-min" @click="minus"></span>
        </div>
        <div>
          <span class="icon-max"></span>
        </div>
        <div>
          <span class="icon-close" @click="cross"></span>
        </div>
      </div>
      <div class="more">
        <span class="icon-more"></span>
      </div>
    </div>
  </div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer
export default {
  methods: {
    minus() {
      ipcRenderer.send('window-min')
    },
    cross() {
      ipcRenderer.send('window-close')
    }
  }
}
</script>

<style scoped lang="scss">
#chat_header {
  height: 100%;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  .name {
    margin: 0 15px;
    font-size: 18px;
    font-weight: 580;
    color: black;
  }
  .actions {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    .toolbar {
      display: flex;
      div {
        width: 34px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
      }
      div:hover {
        background-color: #dfdfdf;
      }
    }

    .more {
      .icon-more {
        font-size: 24px;
      }
      height: 30px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>