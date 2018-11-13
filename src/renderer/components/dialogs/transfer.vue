<template>
  <div id="dialog_transfer">
    <el-dialog title="转账" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="金额" prop="num">
          <el-input v-model="msg.num" placeholder="金额，例如：16.00"></el-input>
        </el-form-item>
        <el-form-item label="附带消息" prop="msg">
          <el-input v-model="msg.msg" placeholder="附带消息，例如：今日工资"></el-input>
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
        num: '',
        msg: ''
      },
      rules: {
        num: [{ required: true, message: '请输入金额', trigger: 'blur' }]
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
          type: constant.MSG_TYPE_TRANSFER,
          from: this.nowUser,
          data: {
            num: this.msg.num,
            msg: this.msg.msg || '',
            type: constant.TRANSFER_PUBLISH,
            publish_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
          },
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