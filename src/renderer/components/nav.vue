<template>
  <div id="nav">
    <div class="avatar">
      <img @click="changeUser(constant.MSG_FROM_SELF)" :src="self.avatar" alt="">
    </div>

    <div class="actions">
      <ul>
        <li>
          <img src="../assets/ic_聊天.png" alt="">
        </li>
        <li>
          <span class="icon-books"></span>
        </li>
        <li>
          <span class="icon-app"></span>
        </li>
      </ul>

      <div class="menu" @click="chatManage">
        <span class="icon-menu"></span>
      </div>

    </div>
    <dialog-chat-manage :event="chat_manage_event"></dialog-chat-manage>
  </div>
</template>

<script>
import EventEmitter from 'eventemitter3'
import constant from '../constant.js'
import { Message } from 'element-ui'
import { mapGetters, mapMutations } from 'vuex'
import DialogChatManage from './dialogs/chat_manage'
export default {
  components: {
    DialogChatManage
  },
  computed: {
    ...mapGetters(['self'])
  },
  data() {
    return {
      constant: constant,
      chat_manage_event: null
    }
  },
  created() {
    this.chat_manage_event = new EventEmitter()
  },
  methods: {
    ...mapMutations(['changeNowUser']),
    changeUser(user) {
      this.changeNowUser(user)
      if (user == constant.MSG_FROM_SELF) {
        Message.success(`已切换为自己`)
      } else {
        Message.success(`已切换为对方`)
      }
    },
    chatManage() {
      this.chat_manage_event.emit('open')
    }
  }
}
</script>

<style scoped lang="scss">
#nav {
  width: 100%;
  height: 100%;
  background: linear-gradient(#202020, #2a2a2a);
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    cursor: pointer;
    width: 35px;
    height: 35px;
    margin-top: 16px;
    img {
      border-radius: 2px;
      width: 100%;
      height: 100%;
    }
  }

  .actions {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    width: 100%;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      cursor: pointer;
      width: 25px;
      height: 25px;
      margin-top: 25px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .menu {
    cursor: pointer;
    width: 25px;
    height: 25px;
    margin-bottom: 16px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.icon-books {
  color: #c3c3c4;
  font-size: 26px;
}
.icon-menu {
  color: #c3c3c4;
  font-size: 30px;
}
.icon-app {
  color: #c3c3c4;
  font-size: 24px;
}
</style>