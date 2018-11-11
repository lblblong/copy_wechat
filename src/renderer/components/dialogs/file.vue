<template>
  <div id="dialog_file">
    <el-dialog title="发送文件" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="类型" prop="file_type">
          <el-select v-model="msg.file_type" placeholder="请选择文件类型" style="width:100%">
            <el-option
              v-for="(type,index) in file_types"
              :key="index"
              :label="type.label"
              :value="type.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="msg.name" placeholder="请输入名字，例如：工作报表.xls"></el-input>
        </el-form-item>
        <el-form-item label="大小" prop="size">
          <el-input v-model="msg.size" placeholder="大小，例如：23k"></el-input>
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
        file_type: constant.FILE_TYPE_WORD,
        name: '',
        size: ''
      },
      file_types: [
        {
          label: '文档',
          value: constant.FILE_TYPE_WORD
        },
        {
          label: '表格',
          value: constant.FILE_TYPE_EXCEL
        },
        {
          label: '文本',
          value: constant.FILE_TYPE_TEXT
        },
        {
          label: '压缩文件',
          value: constant.FILE_TYPE_ZIP
        },
        {
          label: '未知后缀文件',
          value: constant.FILE_TYPE_UNKNOWN
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        size: [{ required: true, message: '请选择大小', trigger: 'blur' }]
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
          type: constant.MSG_TYPE_FILE,
          from: this.nowUser,
          data: {
            file_type: this.msg.file_type,
            name: this.msg.name,
            size: this.msg.size
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