<template>
  <div id="list">
    <header>
      <div class="search">
        <span class="icon-sreach"></span>
        <span>搜索</span>
      </div>
      <div class="add" @click="addChat">
        <span class="icon-add"></span>
      </div>
    </header>

    <ul>
      <li @click="changeChat(chat.id)" :class="{active:nowChat && nowChat.id==chat.id}" v-for="(chat,index) in chats" :key="index">
        <img :src="chat.avatar">
        <div class="meta">
          <div class="top">
            <span class="name">{{chat.user}}</span>
            <span class="time">{{chat.last_msg.time}}</span>
          </div>
          <div class="last_msg">{{msgContentText(chat.last_msg)}}</div>
        </div>
      </li>
    </ul>
    <dialog-add-chat :event="add_chat_event"></dialog-add-chat>
  </div>
</template>

<script>
import EventEmitter from 'eventemitter3'
import dayjs from 'dayjs'
import constant from '../constant'
import { mapGetters, mapMutations } from 'vuex'
import DialogAddChat from './dialogs/add_chat'
export default {
  components: {
    DialogAddChat
  },
  computed: {
    ...mapGetters(['chats', 'nowChat'])
  },
  data() {
    return {
      add_chat_event: null
    }
  },
  created() {
    this.add_chat_event = new EventEmitter()
  },
  methods: {
    ...mapMutations(['changeChat']),
    msgContentText(last_msg) {
      switch (last_msg.type) {
        case constant.MSG_TYPE_TEXT:
          return last_msg.data
        case constant.MSG_TYPE_IMG:
          return '[图片]'
        case constant.MSG_TYPE_TRANSFER:
          return '[转账]'
        case constant.MSG_TYPE_VOICE:
          return '[语音]'
        case constant.MSG_TYPE_VIDEO:
          return '[视频]'
        case constant.MSG_TYPE_FILE:
          return '[文件]'
      }
    },
    addChat() {
      this.add_chat_event.emit('open')
    }
  }
}
</script>

<style scoped lang="scss">
#list {
  width: 100%;
  height: 100%;
  background-color: #ebe8e7;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 10px;
    .search {
      height: 25px;
      width: 190px;
      margin-right: 10px;
      background-color: #dbd9d8;
      display: flex;
      align-items: center;
      .icon-sreach {
        margin: 0 8px;
      }
      span {
        font-size: 13px;
        color: #6c6a6a;
      }
    }
    .add {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 25px;
      background-color: #dbd9d8;
    }
  }

  ul {
    flex: 1;
    overflow-y: scroll;
    width: 267px;
    padding: 0px;
    margin: 0px;
    list-style: none;
    li {
      padding: 13px;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 2px;
        margin-right: 13px;
      }
      .meta {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .name {
            font-size: 14px;
            font-weight: bold;
          }
          .time {
            color: #9c9a9a;
            font-size: 12px;
          }
        }
        .last_msg {
          margin-top: 4px;
          font-size: 12px;
          color: #6c6a6a;
        }
      }
    }

    li:hover:not(.active) {
      background-color: #dfdcdb;
    }

    .active {
      background-color: #c6c5c5;
    }
  }
}
</style>