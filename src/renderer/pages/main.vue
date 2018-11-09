<template>
  <div id="main">
    <v-nav class="nav"></v-nav>
    <v-list class="list"></v-list>
    <v-chat class="chat"></v-chat>
  </div>
</template>

<script>
import nav from '@/components/nav'
import list from '@/components/list'
import chat from '@/components/chat'
export default {
  components: {
    'v-nav': nav,
    'v-list': list,
    'v-chat': chat
  }
}
</script>

<style scoped lang="scss">
#main {
  width: 100%;
  height: 100%;
  display: flex;
  .nav {
    width: 60px;
  }
  .list {
    width: 250px;
    overflow-x: hidden;
  }
  .chat {
    flex: 1;
  }

}
</style>