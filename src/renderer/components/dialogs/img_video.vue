<template>
  <div id="dialog_img_video">
    <el-dialog title="图片和视频" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="类型" prop="type">
          <el-select v-model="msg.type" placeholder="请选择类型" style="width:100%">
            <el-option
              label="图片"
              value="图片">
            </el-option>
            <el-option
              label="视频"
              value="视频">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="image" label="图片" prop="url">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="imgUP">
            <p v-if="!msg.url">点击选择</p>
            <img v-else :src="msg.url" alt="">
          </el-upload>
        </el-form-item>
        <el-form-item v-if="msg.type=='视频'" label="视频时长" prop="len">
          <el-input v-model="msg.len" placeholder="视频时长"></el-input>
        </el-form-item>
      </el-form>
      
      <el-button @click="submit" style="width:100%;">发 送</el-button>
    </el-dialog>
  </div>
</template>

<script>
import lrz from 'lrz'
import dayjs from 'dayjs'
import constant from '../../constant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['event'],
  data() {
    return {
      visible: false,
      msg: {
        type: '图片',
        len: '',
        url: ''
      },
      rules: {
        url: [{ required: true, message: '请输入地址', trigger: 'blur' }],
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
      console.log('提交')
      try {
        await this.$refs.form.validate()
        if (this.msg.type == '图片') {
          this.pushMessage({
            chat_id: this.nowChat.id,
            id: this.nowChat.msgs.length,
            type: constant.MSG_TYPE_IMG,
            from: this.nowUser,
            data: this.msg.url,
            time: dayjs().format('HH:mm')
          })
        } else if (this.msg.type == '视频') {
          this.pushMessage({
            chat_id: this.nowChat.id,
            id: this.nowChat.msgs.length,
            type: constant.MSG_TYPE_VIDEO,
            from: this.nowUser,
            data: {
              img: this.msg.url,
              len: this.msg.len
            },
            time: dayjs().format('HH:mm')
          })
        }
      } catch (err) {}
    },
    open() {
      this.visible = true
    },
    async imgUP(req) {
      try {
        let file = req.file
        let lrzfile = await lrz(file)
        this.msg.url = lrzfile.base64
      } catch (err) {}
    },
  },
  created() {
    this.event.on('open', this.open)
  }
}
</script>

<style scoped>
.image{
  display: flex;
  align-items: center;
}
img {
  width: 100px;
  height: 100px;
}
</style>