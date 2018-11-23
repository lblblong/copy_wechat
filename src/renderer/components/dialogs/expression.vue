<template>
  <div id="dialog_expression">
    <el-dialog title="选择表情" :visible.sync="visible">
      <img @click="selExpression(expression)" v-for="expression in expressions" :key="expression.index" :src="expression.img" alt="">
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
      expressions: window.expressions
    }
  },
  computed: {},
  methods: {
    open() {
      this.visible = true
    },
    selExpression(expression) {
      this.event.emit('selExpression', expression)
      this.visible = false
    }
  },
  created() {
    this.event.on('open', this.open)
  }
}
</script>

<style scoped lang="scss">
img {
  cursor: pointer;
  width: 30px;
  height: 30px;
}
</style>