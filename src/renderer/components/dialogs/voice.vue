<template>
  <div id="dialog_voice">
    <el-dialog title="语音" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="时长" prop="len">
          <el-input v-model="msg.len" placeholder="时长，例如：16"></el-input>
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
        len: ''
      },
      rules: {
        len: [{ required: true, message: '请输入时长', trigger: 'blur' }]
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
          type: constant.MSG_TYPE_VOICE,
          from: this.nowUser,
          data: this.msg.len,
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