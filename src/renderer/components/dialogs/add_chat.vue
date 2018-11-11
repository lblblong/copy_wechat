<template>
  <div id="dialog_add_chat">
    <el-dialog title="添加聊天" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="名字" prop="name">
          <el-input v-model="msg.name" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item label="头像URL" prop="avatar">
          <el-input v-model="msg.avatar" placeholder="头像URL"></el-input>
        </el-form-item>
      </el-form>
      
      <el-button @click="submit" style="width:100%;">添 加</el-button>
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
      visible: false,
      msg: {
        name: '',
        avatar:
          'https://avatar-static.segmentfault.com/425/270/4252702309-5a1510af3804c_big64'
      },
      rules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        avatar: [{ required: true, message: '请输入头像地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['chats'])
  },
  methods: {
    ...mapMutations(['pushChat']),
    rowDialogClose() {
      this.visible = false
    },
    async submit() {
      try {
        await this.$refs.form.validate()
        this.pushChat({
          id: this.chats.length,
          user: this.msg.name,
          avatar: this.msg.avatar,
          msgs: [
            {
              id: 0,
              from: constant.MSG_FROM_SYSTEM,
              data: '你们已成为好友'
            },
            {
              id: 1,
              type: constant.MSG_TYPE_TEXT,
              from: constant.MSG_FROM_OPPOSITE,
              data: '你好',
              time: dayjs().format('HH:mm')
            }
          ],
          last_msg: {
            id: 1,
            type: constant.MSG_TYPE_TEXT,
            from: constant.MSG_FROM_OPPOSITE,
            data: '你好',
            time: dayjs().format('HH:mm')
          }
        })
      } catch (err) {}
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

<style scoped>
</style>