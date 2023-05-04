<template>
    <header class="view-header">
        <van-icon name="arrow-left" size="20rem" @click="$router.go(-1)" />
        <h3>恭迎二十大</h3>
    </header>
    <div class="iframe-box">
        <iframe :src="url">
        </iframe>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from "vue-router";

const route = useRoute()

const url = ref(<string>route.query.url)
</script>
  
<style lang="scss" scoped>
.view-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50rem;
    padding: 0 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16rem;

    &::after {
        content: '';
        width: 20rem;
        height: 20rem;
        display: block;
    }
}

.iframe-box {
    width: 100vw;
    overflow: hidden;

    iframe {
        width: 392rem;
        height: 100vh;
        padding-top: 50rem;
    }
}</style>