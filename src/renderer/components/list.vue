<template>
  <div id="list">
    <header>
      <div class="search">
        <span class="icon-sreach"></span>
        <span>搜索</span>
      </div>
      <div class="add">
        <span class="icon-add"></span>
      </div>
    </header>

    <ul>
      <li @click="current = chat.id" :class="{active:current==chat.id}" v-for="chat in chats" :key="chat.id">
        <img :src="chat.avatar">
        <div class="meta">
          <div class="top">
            <span class="name">{{chat.name}}</span>
            <span class="time">{{chat.time}}</span>
          </div>
          <div class="last_msg">{{chat.last_msg}}</div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      chats: [
        {
          id: 1,
          name: 'lblblong',
          time: '10:55',
          last_msg: '好的',
          avatar: require('@/assets/avatar.jpg')
        },
        {
          id: 2,
          name: '文件传输助手',
          time: '07:44',
          last_msg: '明天去吃烤鸭',
          avatar: require('@/assets/avatar.jpg')
        }
      ],
      current: 1
    }
  }
}
</script>

<style scoped lang="scss">
#list {
  width: 100%;
  height: 100%;
  background-color: #ebe8e7;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 10px;
    .search {
      height: 25px;
      width: 190px;
      margin-right: 10px;
      background-color: #dbd9d8;
      display: flex;
      align-items: center;
      .icon-sreach {
        margin: 0 8px;
      }
      span {
        font-size: 13px;
        color: #6c6a6a;
      }
    }
    .add {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 25px;
      background-color: #dbd9d8;
    }
  }

  ul {
    flex: 1;
    overflow-y: scroll;
    width: 267px;
    padding: 0px;
    margin: 0px;
    list-style: none;
    li {
      padding: 13px;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 2px;
        margin-right: 13px;
      }
      .meta {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .name {
            font-size: 14px;
            font-weight: bold;
          }
          .time {
            color: #9c9a9a;
            font-size: 12px;
          }
        }
        .last_msg {
          margin-top: 4px;
          font-size: 12px;
          color: #6c6a6a;
        }
      }
    }

    li:hover:not(.active) {
      background-color: #dfdcdb;
    }

    .active {
      background-color: #c6c5c5;
    }
  }
}
</style>