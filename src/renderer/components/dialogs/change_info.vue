<template>
  <div id="dialog_chang_avatar">
    <el-dialog title="修改双方信息" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :model="msg" style="width:100%">
        <el-form-item label="我的头像URL" prop="self_avatar">
          <el-input v-model="msg.self_avatar" placeholder="头像URL"></el-input>
        </el-form-item>
        <el-form-item label="对方名字" prop="opposite_name">
          <el-input v-model="msg.opposite_name" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item label="对方头像URL" prop="opposite_avatar">
          <el-input v-model="msg.opposite_avatar" placeholder="头像URL"></el-input>
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
        self_avatar: '',
        opposite_name: '',
        opposite_avatar: ''
      }
    }
  },
  computed: {
    ...mapGetters(['self', 'nowChat'])
  },
  methods: {
    ...mapMutations(['changeAvatar', 'changeNowChatInfo']),
    rowDialogClose() {
      this.visible = false
    },
    async submit() {
      try {
        await this.$refs.form.validate()
        this.changeAvatar(this.msg.self_avatar)
        this.changeNowChatInfo({
          user: this.msg.opposite_name,
          avatar: this.msg.opposite_avatar
        })
      } catch (err) {}
    },
    open() {
      this.visible = true
      this.msg.self_avatar = this.self.avatar
      this.msg.opposite_name = this.nowChat.user
      this.msg.opposite_avatar = this.nowChat.avatar
    }
  },
  created() {
    this.event.on('open', this.open)
  },
  mounted() {}
}
</script>

<style scoped>
</style>