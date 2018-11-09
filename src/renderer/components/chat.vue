<template>
  <div id="chat">
    <chat-header class="chat_header" style="-webkit-app-region: drag">
    </chat-header>

    <div class="chat_body">
      <div class="chat_window" ref="chatWindow">
        <div class="message" v-for="msg in msgs" :key="msg.id">
          <div class="opposite" v-if="msg.from == constant.MSG_FROM_OPPOSITE">
            <img :src="msg.user.avatar" alt="">

            <message-text v-if="msg.type == constant.MSG_TYPE_TEXT" :direction="msg.from" :msg="msg.data"></message-text>
            <message-img-l v-if="msg.type == constant.MSG_TYPE_IMG" :src="msg.data"></message-img-l>
            <message-video-l v-if="msg.type == constant.MSG_TYPE_VIDEO" :data="msg.data"></message-video-l>
            <message-transfer v-if="msg.type == constant.MSG_TYPE_TRANSFER" :direction="msg.from" :data="msg.data"></message-transfer>
            <message-voice v-if="msg.type == constant.MSG_TYPE_VOICE" :direction="msg.from" :data="msg.data"></message-voice>
          </div>

          <div class="self" v-if="msg.from == constant.MSG_FROM_SELF">
            <message-text v-if="msg.type == constant.MSG_TYPE_TEXT" :direction="msg.from" :msg="msg.data"></message-text>
            <message-video-r v-if="msg.type == constant.MSG_TYPE_VIDEO" :data="msg.data"></message-video-r>
            <message-transfer v-if="msg.type == constant.MSG_TYPE_TRANSFER" :direction="msg.from" :data="msg.data"></message-transfer>
            <message-voice v-if="msg.type == constant.MSG_TYPE_VOICE" :direction="msg.from" :data="msg.data"></message-voice>
            
            <img :src="msg.user.avatar" alt="">
          </div>
        </div>
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

import constant from '@/constant.js'
import ChatHeader from './chat_header'
import MessageText from './messages/message_text'
import MessageImgR from './messages/message_img_r'
import MessageImgL from './messages/message_img_l'
import MessageTransfer from './messages/message_transfer'
import MessageVoice from './messages/message_voice'
import MessageVideoR from './messages/message_video_r'
import MessageVideoL from './messages/message_video_l'
export default {
  components: {
    ChatHeader,
    MessageText,
    MessageImgR,
    MessageImgL,
    MessageTransfer,
    MessageVoice,
    MessageVideoR,
    MessageVideoL
  },
  data() {
    return {
      msgs: msgs,
      message: '',
      constant: constant
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped lang="scss">
#chat {
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
}
</style>