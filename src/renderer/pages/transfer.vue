<template>
  <div>
    <div v-if="step == 1" class="wait" style="-webkit-app-region: drag">
      <img src="../assets/wait.png" alt="">
      <div class="title">待确认收钱</div>
      <div class="num">￥{{transfer.now.data.num}}</div>
      <div class="btn" style="-webkit-app-region: no-drag" @click="affirmTransfer">确认收钱</div>
      <div class="des">1天内未确认，将退还给对方 <span>立即退还</span></div>
      <div class="time">转账时间：{{transfer.now.data.publish_time}}</div>
    </div>
    <div v-else class="ok" style="-webkit-app-region: drag">
      <img src="../assets/ok.png" alt="">
      <div class="title">已收钱</div>
      <div class="num">￥{{transfer.now.data.num}}</div>
      <div class="z_time">转账时间：{{transfer.now.data.publish_time}}</div>
      <div class="s_time">收钱时间：{{transfer.now.data.receive_time}}</div>
    </div>
  </div>
</template>

<script>
import constant from '../constant.js'
import dayjs from 'dayjs'
const ipcRenderer = require('electron').ipcRenderer
export default {
  data() {
    return {
      step: 1,
      transfer: {
        now: {
          data: {}
        }
      }
    }
  },
  created() {
    ipcRenderer.send('window_ipc_register', 'transfer')

    ipcRenderer.on('hide',(event, _)=>{
      this.transfer.now = {
        data: {}
      }
      console.log('数据以改变')
    })

    ipcRenderer.on('transfer_show', (event, msg) => {
      this.transfer.now = JSON.parse(msg)
      if (this.transfer.now.data.type == constant.TRANSFER_RECEIVE) {
        this.step = 2
      } else {
        this.step = 1
      }
    })
  },
  methods: {
    // 确认收钱
    affirmTransfer() {
      this.step = 2
      let receive_time = dayjs().format('YYYY-MM-DD HH:mm:ss')
      this.transfer.now.data.receive_time = receive_time
      let from =
        this.transfer.now.from == constant.MSG_FROM_SELF
          ? constant.MSG_FROM_OPPOSITE
          : constant.MSG_FROM_SELF
      let msg = {
        type: constant.MSG_TYPE_TRANSFER,
        from,
        data: {
          num: this.transfer.now.data.num,
          type: constant.TRANSFER_RECEIVE,
          publish_time: this.transfer.now.data.publish_time,
          receive_time: receive_time
        },
        time: dayjs().format('HH:mm')
      }
      // 传递回去
      ipcRenderer.send('transfer_pub_msg', JSON.stringify(msg))
    }
  }
}
</script>

<style scoped lang="scss">
.wait,
.ok {
  width: 300px;
  height: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  img {
    height: 78px;
    margin-top: 65px;
  }
  .title {
    font-size: 22px;
    margin-top: 16px;
    font-weight: 500;
  }
  .num {
    font-size: 34px;
    margin-top: 20px;
    font-weight: 500;
  }
}

.wait {
  .btn {
    cursor: pointer;
    height: 41px;
    width: 180px;
    background-color: #1aad19;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .des {
    font-size: 14px;
    margin-top: 22px;
    color: #a5a5a5;
    span {
      color: #426794;
    }
  }
  .time {
    font-size: 14px;
    margin-top: 40px;
    color: #a5a5a5;
  }
}

.ok {
  .z_time {
    margin-top: 126px;
    font-size: 14px;
    color: #a5a5a5;
  }
  .s_time {
    margin-top: 8px;
    font-size: 14px;
    color: #a5a5a5;
  }
}
</style>