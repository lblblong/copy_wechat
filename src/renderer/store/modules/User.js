import constant from "../../constant"
import dayjs from "dayjs"
import Store from "electron-store"
const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"

const store = new Store()

const def = {
  self: {
    avatar: require("../../assets/avatar.jpg"),
  },
  chats: [
    {
      id: 0,
      user: "新手入门",
      avatar:
        "https://avatar-static.segmentfault.com/325/564/3255641526-59ace0589088d_big64",
      msgs: [
        {
          id: 0,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data: "欢迎使用copy_wechat，这里是新手教程。",
          time: dayjs().format("HH:mm"),
        },
        {
          id: 1,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data:
            "一、当你需要添加聊天对象的时候，点击聊天列表右上角的加号，即可添加聊天对象，对象头像需使用网络图片",
          time: dayjs().format("HH:mm"),
        },
        {
          id: 2,
          type: constant.MSG_TYPE_IMG,
          from: constant.MSG_FROM_OPPOSITE,
          data: require("../../assets/img_guide_1.png"),
          time: dayjs().format("HH:mm"),
        },
        {
          id: 3,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data:
            "二、切换身份输入消息，可通过<br/>1. 点击聊天窗口对方用户名切换到对方（快捷键ctrl+o）<br/>2. 点击左上角自己的头像切换到自己（快捷键ctrl+s）<br/>",
          time: dayjs().format("HH:mm"),
        },
        {
          id: 4,
          type: constant.MSG_TYPE_IMG,
          from: constant.MSG_FROM_OPPOSITE,
          data: require("../../assets/img_guide_2.png"),
          time: dayjs().format("HH:mm"),
        },
        {
          id: 5,
          type: constant.MSG_TYPE_IMG,
          from: constant.MSG_FROM_OPPOSITE,
          data: require("../../assets/img_guide_3.png"),
          time: dayjs().format("HH:mm"),
        },
        {
          id: 6,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data: "三、点击消息列表中双方头像可删除对应的消息",
          time: dayjs().format("HH:mm"),
        },
        {
          id: 6,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data:
            "四、聊天输入框上的按钮只有表情是可用的，其他功能，比如生成语音、视频、文件等气泡请通过右上角更多按钮。",
          time: dayjs().format("HH:mm"),
        },
        {
          id: 5,
          type: constant.MSG_TYPE_IMG,
          from: constant.MSG_FROM_OPPOSITE,
          data: require("../../assets/img_guide_4.png"),
          time: dayjs().format("HH:mm"),
        },
      ],
    },
    {
      id: 1,
      user: "文件传输助手",
      avatar: require("../../assets/img_assistant.png"),
      msgs: [
        {
          id: 0,
          type: constant.MSG_TYPE_FILE,
          from: constant.MSG_FROM_OPPOSITE,
          data: {
            file_type: constant.FILE_TYPE_WORD,
            name: "新建文本文档.doc",
            size: "26kb",
          },
          time: dayjs().format("HH:mm"),
        },
        {
          id: 1,
          type: constant.MSG_TYPE_VOICE_CALL,
          from: constant.MSG_FROM_OPPOSITE,
          data: {
            len: "00:45",
          },
          time: dayjs().format("HH:mm"),
        },
        {
          id: 2,
          type: constant.MSG_TYPE_VOICE_CALL,
          from: constant.MSG_FROM_SELF,
          data: {
            len: "00:14",
          },
          time: dayjs().format("HH:mm"),
        },
        {
          id: 3,
          type: constant.MSG_TYPE_VIDEO_CALL,
          from: constant.MSG_FROM_SELF,
          data: {
            len: "00:14",
          },
          time: dayjs().format("HH:mm"),
        },
        {
          id: 4,
          type: constant.MSG_TYPE_VIDEO_CALL,
          from: constant.MSG_FROM_OPPOSITE,
          data: {
            len: "00:14",
          },
          time: dayjs().format("HH:mm"),
        },
      ],
    },
  ],
  _nowChat: null,
  nowUser: constant.MSG_FROM_SELF,
}

const state = store.get('data', def)
// const state = def
state._nowChat = state.chats[0]

const mutations = {
  changeChat: (state, id) => {
    state._nowChat = state.chats.find((it) => it.id == id)
  },
  changeNowChatInfo: (state, chat) => {
    if (state._nowChat) {
      state._nowChat.user = chat.user
      state._nowChat.avatar = chat.avatar
      state._nowChat = state._nowChat
    } else {
      state.chats[0].user = chat.user
      state.chats[0].avatar = chat.avatar
      state.chats = state.chats
    }
  },
  pushMessage: (state, msg) => {
    for (let i = 0; i < state.chats.length; i++) {
      let chat = state.chats[i]
      if (chat.id == msg.chat_id) {
        chat.msgs.push(msg)
      }
    }
    window.globalEvent.emit("pubmsg")
  },
  delMsg: (state, id) => {
    let nowChat = state._nowChat || state.chats[0]
    nowChat.msgs = nowChat.msgs.filter((msg) => {
      return msg.id != id
    })
  },
  changeNowUser: (state, nowUser) => {
    state.nowUser = nowUser
  },
  pushChat: (state, chat) => {
    state.chats.push(chat)
  },
  delChat: (state, id) => {
    let chat_index = state.chats.findIndex((chat) => {
      return chat.id == id
    })
    state.chats.splice(chat_index, 1)
  },
  close: (state) => {
    store.set("data", state)
    Message.success(`数据已保存`)
    setTimeout(() => {
      ipcRenderer.send("window-close")
    }, 1000)
  },
  changeAvatar: (state, avatar) => {
    console.log("更换头像")
    state.self.avatar = avatar
  },
}

const getters = {
  self: (state) => state.self,
  chats: (state) => state.chats,
  nowChat: (state) => {
    if (!state._nowChat) {
      state._nowChat = state.chats[0] || {}
    }
    return state._nowChat
  },
  nowUser: (state) => state.nowUser,
}

export default {
  state,
  mutations,
  getters,
}
