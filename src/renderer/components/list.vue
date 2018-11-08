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
      <li>
        <img src="../assets/avatar.jpg" alt="">
        <div class="meta">
          <div class="top">
            <span class="name">lblblong</span>
            <span class="time">21:37</span>
          </div>
          <div class="last_msg">好的</div>
        </div>
      </li>
      <li>
        <img src="../assets/avatar.jpg" alt="">
        <div class="meta">
          <div class="top">
            <span class="name">客户</span>
            <span class="time">07:44</span>
          </div>
          <div class="last_msg">已经付款啦</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
#list {
  width: 100%;
  height: 100%;
  background-color: #ebe8e7;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 15px;
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
    padding: 0px;
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
  }
}
</style>