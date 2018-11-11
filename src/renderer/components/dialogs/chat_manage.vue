<template>
  <div id="dialog_chat_manage">
    <el-dialog title="聊天列表" :visible="visible" @close="rowDialogClose">
      <div class="item" v-show="chat.user != '文件传输助手'" v-for="chat in chats" :key="chat.id">
        <span class="name">{{chat.user}}</span>
        <span class="del" @click="delChat(chat.id)">删除</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import constant from '../../constant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['event'],
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters(['chats'])
  },
  methods: {
    ...mapMutations(['delChat']),
    rowDialogClose() {
      this.visible = false
    },
    open() {
      this.visible = true
    }
  },
  created() {
    this.event.on('open', this.open)
  }
}
</script>

<style scoped lang="scss">
#dialog_chat_manage {
  .item {
    height: 40px;
    display: flex;
    border: 1px solid #dfdfdf;
    align-items: center;
    padding: 0 16px;
    justify-content: space-between;
    margin-bottom: 8px;
    border-radius: 6px;
    .del {
      color: red;
    }
  }
}
</style>