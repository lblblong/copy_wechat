<template>
  <div id="chat_header">
    <div class="name" style="-webkit-app-region: no-drag">
      <div @click="changeUser(constant.MSG_FROM_OPPOSITE)">{{nowChat.user}}</div>
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
        <el-dropdown trigger="click">
          <span class="icon-more"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="actionHandler('voice')">发送语音</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('file')">发送文件</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('transter')">发送转账</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('img_video')">发送图片和视频</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('video_call')">发送视频或语音通话</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('system')">发送系统消息</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('set_user')">修改双方信息</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('msg_manage')">消息管理</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('change_user_self')">切换为自己</el-dropdown-item>
            <el-dropdown-item @click.native="actionHandler('change_user_opposite')">切换为对方</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <dialog-file :event="file_event"></dialog-file>
      <dialog-transfer :event="transter_event"></dialog-transfer>
      <dialog-img-video :event="img_video_event"></dialog-img-video>
      <dialog-voice :event="voice_event"></dialog-voice>
      <dialog-system :event="system_event"></dialog-system>
      <dialog-change-info :event="change_info_event"></dialog-change-info>

    </div>
  </div>
</template>

<script>
import EventEmitter from 'eventemitter3'
import constant from '../constant.js'
import { Message } from 'element-ui'
import { mapGetters, mapMutations } from 'vuex'
const ipcRenderer = require('electron').ipcRenderer

import DialogFile from './dialogs/file'
import DialogTransfer from './dialogs/transfer'
import DialogImgVideo from './dialogs/img_video'
import DialogVoice from './dialogs/voice'
import DialogSystem from './dialogs/system'
import DialogChangeInfo from './dialogs/change_info'
export default {
  components: {
    DialogFile,
    DialogTransfer,
    DialogImgVideo,
    DialogVoice,
    DialogSystem,
    DialogChangeInfo
  },
  computed: {
    ...mapGetters(['nowChat'])
  },
  data() {
    return {
      constant: constant,
      file_event: null,
      transter_event: null,
      img_video_event: null,
      voice_event: null,
      system_event: null,
      change_info_event: null,
    }
  },
  created() {
    this.file_event = new EventEmitter()
    this.transter_event = new EventEmitter()
    this.img_video_event = new EventEmitter()
    this.voice_event = new EventEmitter()
    this.system_event = new EventEmitter()
    this.change_info_event = new EventEmitter()
  },
  methods: {
    ...mapMutations(['changeNowUser']),
    minus() {
      ipcRenderer.send('window-min')
    },
    cross() {
      this.$store.commit('close')
    },
    changeUser(user) {
      this.changeNowUser(user)
      if (user == constant.MSG_FROM_SELF) {
        Message.success(`已切换为自己`)
      } else {
        Message.success(`已切换为对方`)
      }
    },
    actionHandler(action) {
      switch (action) {
        case 'file':
          this.file_event.emit('open')
          break
        case 'transter':
          this.transter_event.emit('open')
          break
        case 'img_video':
          this.img_video_event.emit('open')
          break
        case 'voice':
          this.voice_event.emit('open')
          break
        case 'video_call':
          this.voice_event.emit('open')
          break
        case 'system':
          this.system_event.emit('open')
          break
        case 'set_user':
          this.change_info_event.emit('open')
          break
        case 'msg_manage':
          this.voice_event.emit('open')
          break
        case 'change_user_self':
          this.changeUser(constant.MSG_FROM_SELF)
          break
        case 'change_user_opposite':
          this.changeUser(constant.MSG_FROM_OPPOSITE)
          break
      }
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
    cursor: pointer;
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
        cursor: pointer;
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