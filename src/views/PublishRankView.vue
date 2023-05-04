<template>
    <div class="loading" v-if="loading"><van-loading type="spinner" /></div>
    <div class="book-box" v-else>
        <header class="rank-header">
            <van-icon name="arrow-left" size="20rem" @click="$router.go(-1)" />
            <h3>{{ publishRankList.title }}</h3>
        </header>
        <van-divider />
        <section class="recommend-list" v-for="item in publishRankList?.books" @click="pushParticulars(item.id, item.title)">
            <van-image width="69rem" height="96.59rem" :src="item.cover + '?imageView&thumbnail=240y336'" radius="10rem" />
            <div class="book-msg">
                <h5>{{ item.title }}</h5>
                <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
                <p>{{ item.recomContent || item.content }}</p>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRankStore } from "@/stores/RankingList";
import { storeToRefs } from "pinia";
import { useRoute,useRouter } from "vue-router";

const router = useRouter()
const route = useRoute()
const store = useRankStore()
const { publishRankList } = storeToRefs(store);
const { updatePublishRankList } = store

const loading = ref(true)

async function getRankList() {
    await updatePublishRankList(<string>route.query.url)
    loading.value = false
}
getRankList()

function pushParticulars(id: string, title: string) {
    router.push({ path: '/particulars', query: { queryId: id, title: title } })
}
</script>

<style lang="scss" scoped>
.loading{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.book-box {
    .rank-header {
        padding: 20rem 20rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16rem;

        &::after {
            content: '';
            width: 20rem;
            height: 20rem;
            display: flex;
        }
    }

    .recommend-list {
        width: 100%;
        margin: 20rem 0;
        padding: 0 10rem;
        display: flex;

        &:last-child {
            margin: 0;
        }

        .van-image {
            flex-shrink: 0;
            box-shadow: 5rem 5rem 5rem 0 $shadowColor;
        }

        .book-msg {
            margin-left: 10rem;

            h5 {
                font-size: 16rem;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }

            div {
                margin: 10rem 0;
                font-size: 12rem;
                color: $elseFontColor;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }

            p {
                font-size: 14rem;
                color: $elseFontColor;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>