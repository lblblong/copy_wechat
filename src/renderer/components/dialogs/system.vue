<template>
  <div id="dialog_system">
    <el-dialog title="系统消息" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="消息内容" prop="content">
          <el-input v-model="msg.content"></el-input>
        </el-form-item>
      </el-form>
      
      <el-button @click="submit" style="width:100%;">发 送</el-button>
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
        content: ''
      },
      rules: {
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['nowChat', 'self', 'nowUser'])
  },
  methods: {
    ...mapMutations(['pushMessage']),
    rowDialogClose() {
      this.visible = false
    },
    async submit() {
      try {
        await this.$refs.form.validate()
        this.pushMessage({
          chat_id: this.nowChat.id,
          id: this.nowChat.msgs.length,
          from: constant.MSG_FROM_SYSTEM,
          data: this.msg.content,
          time: dayjs().format('HH:mm')
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