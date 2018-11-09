<template>
  <div id="nav">
    <div class="avatar">
      <img src="../assets/avatar.jpg" alt="">
    </div>

    <div class="actions">
      <ul>
        <li>
          <img src="../assets/ic_聊天.png" alt="">
        </li>
        <li>
          <span class="icon-books"></span>
        </li>
        <li>
          <span class="icon-app"></span>
        </li>
      </ul>

      <div class="menu">
        <span class="icon-menu"></span>
      </div>
    </div>

  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
#nav {
  width: 100%;
  height: 100%;
  background: linear-gradient(#202020, #2a2a2a);
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    width: 35px;
    height: 35px;
    margin-top: 16px;
    img {
      border-radius: 2px;
      width: 100%;
      height: 100%;
    }
  }

  .actions {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    width: 100%;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 25px;
      height: 25px;
      margin-top: 25px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .menu {
    width: 25px;
    height: 25px;
    margin-bottom: 16px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.icon-books {
  color: #c3c3c4;
  font-size: 26px;
}
.icon-menu {
  color: #c3c3c4;
  font-size: 30px;
}
.icon-app {
  color: #c3c3c4;
  font-size: 24px;
}
</style>