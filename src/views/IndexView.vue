<template>
  <nav class="nav-box">
    <RouterLink to="/bookrack"><span class="iconfont">&#xe7ef;</span>书架</RouterLink>
    <RouterLink to="/"><span class="iconfont">&#xe731;</span>书城</RouterLink>
    <RouterLink to="/bookType"><span class="iconfont">&#xe6ae;</span>分类</RouterLink>
    <RouterLink to="/mine"><span class="iconfont">&#xe620;</span>我的</RouterLink>
  </nav>
  <!-- <RouterView /> -->
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.nav-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $backColor;
  box-shadow: 0 0 2rem 0 $shadowColor;
  z-index: 99999;
}

a {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $elseFontColor;

  .iconfont {
    font-size: 26rem;
  }

}
.router-link-exact-active {
    color: $fontColorIndex;
  }
</style>
