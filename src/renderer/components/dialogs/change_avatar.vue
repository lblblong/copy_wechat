<template>
  <div id="dialog_chang_avatar">
    <el-dialog title="更换自己的头像" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="头像URL" prop="avatar">
          <el-input v-model="msg.avatar" placeholder="头像URL"></el-input>
        </el-form-item>
      </el-form>
      
      <el-button @click="submit" style="width:100%;">更 换</el-button>
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
        avatar:
          'https://avatar-static.segmentfault.com/425/270/4252702309-5a1510af3804c_big64'
      },
      rules: {
        avatar: [{ required: true, message: '请输入头像地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['chats'])
  },
  methods: {
    ...mapMutations(['changeAvatar']),
    rowDialogClose() {
      this.visible = false
    },
    async submit() {
      try {
        await this.$refs.form.validate()
        this.changeAvatar(this.msg.avatar)
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