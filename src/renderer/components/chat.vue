<template>
  <div id="chat">
    <chat-header class="chat_header" style="-webkit-app-region: drag">
    </chat-header>

    <div class="chat_body">
      <div class="chat_window" ref="chatWindow">
        <div class="message" v-for="msg in msgs" :key="msg.id">
          <div class="sys_msg" v-if="msg.from == constant.MSG_FROM_SYSTEM">
            <span>{{msg.data}}</span>
          </div>
          <div v-else :class="getClass(msg.from)">
            <img v-if="msg.from == constant.MSG_FROM_OPPOSITE" :src="msg.user.avatar" alt="">

            <!-- 文字消息 -->
            <message-text v-if="msg.type == constant.MSG_TYPE_TEXT" :direction="msg.from" :msg="msg.data"></message-text>

            <!-- 图片消息 -->
            <message-img-l v-if="msg.type == constant.MSG_TYPE_IMG && msg.from == constant.MSG_FROM_OPPOSITE" :src="msg.data"></message-img-l>
            <message-img-r v-if="msg.type == constant.MSG_TYPE_IMG && msg.from == constant.MSG_FROM_SELF" :src="msg.data"></message-img-r>

            <!-- 视频消息 -->
            <message-video-l v-if="msg.type == constant.MSG_TYPE_VIDEO && msg.from == constant.MSG_FROM_OPPOSITE" :data="msg.data"></message-video-l>
            <message-video-r v-if="msg.type == constant.MSG_TYPE_VIDEO && msg.from == constant.MSG_FROM_SELF" :data="msg.data"></message-video-r>

            <!-- 转账消息 -->
            <message-transfer @click.native="transferClick(msg)" v-if="msg.type == constant.MSG_TYPE_TRANSFER" :direction="msg.from" :data="msg.data"></message-transfer>

            <!-- 语言消息 -->
            <message-voice v-if="msg.type == constant.MSG_TYPE_VOICE" :direction="msg.from" :data="msg.data"></message-voice>

            <!-- 文件消息 -->
            <message-file v-if="msg.type == constant.MSG_TYPE_FILE" :direction="msg.from" :data="msg.data"></message-file>
            <img v-if="msg.from == constant.MSG_FROM_SELF" :src="msg.user.avatar" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="dialog" v-show="transfer.show" @click="transfer.show = false">
      <div v-if="transfer.step == 1" class="wait">
        <img src="../assets/wait.png" alt="">
        <div class="title">待确认收钱</div>
        <div class="num">￥0.1</div>
        <div class="btn" @click.stop="transfer.step = 2">确认收钱</div>
        <div class="des">1天内未确认，将退还给对方 <span>立即退还</span></div>
        <div class="time">转账时间：2018-11-09 21:26:03</div>
      </div>
      <div v-else class="ok">
        <img src="../assets/ok.png" alt="">
        <div class="title">已收钱</div>
        <div class="num">￥0.1</div>
        <div class="z_time">转账时间：2018-11-09 21:26:03</div>
        <div class="s_time">收钱时间：2018-11-10 10:26:03</div>
      </div>
    </div>

    <footer>
      <div class="toolbar">
        <span><span class="icon-emoji"></span></span>
        <span><span class="icon-file"></span></span>
        <span><span class="icon-cut"></span></span>
        <span><span class="icon-message"></span></span>
      </div>
      <div>
        <textarea rows="3" v-model="message" @keyup.enter="submit"></textarea>
      </div>
      <div class="sent_warp">
        <button>发送(S)</button>
      </div>
    </footer>
  </div>
</template>

<script>
import msgs from './data.js'

import constant from '../constant.js'
import ChatHeader from './chat_header'
import MessageText from './messages/message_text'
import MessageImgR from './messages/message_img_r'
import MessageImgL from './messages/message_img_l'
import MessageTransfer from './messages/message_transfer'
import MessageVoice from './messages/message_voice'
import MessageVideoR from './messages/message_video_r'
import MessageVideoL from './messages/message_video_l'
import MessageFile from './messages/message_file'
export default {
  components: {
    ChatHeader,
    MessageText,
    MessageImgR,
    MessageImgL,
    MessageTransfer,
    MessageVoice,
    MessageVideoR,
    MessageVideoL,
    MessageFile
  },
  data() {
    return {
      msgs: msgs,
      message: '',
      constant: constant,
      transfer: {
        show: true,
        now: null,
        step: 1
      }
    }
  },
  methods: {
    getClass(from) {
      return from == constant.MSG_FROM_SELF ? 'self' : 'opposite'
    },
    submit() {
      if (!this.message) return
      this.msgs.push({
        id: this.msgs.length,
        type: constant.MSG_TYPE_TEXT,
        from: constant.MSG_FROM_SELF,
        user: {
          avatar: require('@/assets/avatar.jpg')
        },
        data: this.message
      })
      this.message = ''
      this.$refs.chatWindow.scrollTop = 100000
    },
    transferClick(msg) {
      if (msg.data.type != constant.TRANSFER_PUBLISH) {
        return
      }
      this.transfer.now = msg
      this.transfer.step = 1
      this.transfer.show = true
    },
    transferDialogClick(event) {
      console.log(event)
    },
    ok(event) {
      console.log('ok触发', event)
    }
  }
}
</script>

<style scoped lang="scss">
#chat {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  .chat_header {
    height: 60px;
  }

  .chat_body {
    flex: 1;
    overflow-y: hidden;
    overflow-x: hidden;
    .chat_window {
      height: 100%;
      width: calc(100% + #{17px});
      overflow-y: scroll;
      padding: 0px;
      margin: 0px;
      > .message:last-of-type {
        margin-bottom: 8px;
      }
    }
    .opposite,
    .self {
      display: flex;
      padding: 0 16px;
      margin-top: 15px;
      img {
        width: 35px;
        height: 35px;
      }
    }
    .opposite {
      justify-content: flex-start;
      img {
        margin-right: 8px;
      }
    }
    .self {
      justify-content: flex-end;
      img {
        margin-left: 8px;
      }
    }
    .sys_msg {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
      > span {
        font-size: 10px;
        color: #fff;
        background-color: #dadada;
        border-radius: 2px;
        padding: 5px 8px;
      }
    }
  }

  footer {
    height: 145px;
    background-color: white;
    border-top: 1px solid #e5e5e5;
    padding: 6px 15px;
    .toolbar {
      width: 100%;
      display: flex;
      align-items: center;
      > span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 34px;
        height: 30px;
        > span {
          font-size: 18px;
        }
        .icon-cut {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 500px;
      padding: 8px;
    }
    .sent_warp {
      display: flex;
      justify-content: flex-end;
      button {
        width: 68px;
        height: 26px;
        border: 1px solid #e5e5e5;
        background-color: #f5f5f5;
        font-size: 14px;
        outline: none;
        cursor: pointer;
      }
      button:hover {
        background-color: #129611;
        color: #fff;
      }
    }
  }

  .dialog {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .dialog > .wait,
  .ok {
    width: 300px;
    height: 430px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    z-index: 100;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -215px;
    margin-left: -150px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.1);
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

  .dialog > .wait {
    .btn {
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

  .dialog > .ok {
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
}
</style>