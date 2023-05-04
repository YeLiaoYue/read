<script setup lang="ts">
import {ref} from 'vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from "@/stores/changeTheme";

const store = useThemeStore()
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
body{
  background-color: $backColor;
  color: $fontColorIndex;
}

@font-face {
  font-family: "iconfont"; /* Project id 3995470 */
  src: url('./font/iconfont.woff2?t=1680767331517') format('woff2'),
       url('./font/iconfont.woff?t=1680767331517') format('woff'),
       url('./font/iconfont.ttf?t=1680767331517') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16rem;
}

a {
  text-decoration: none;
  color: $fontColorSecond;
}
</style>
