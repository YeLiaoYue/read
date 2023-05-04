<template>
    <div class="loading-box" v-if="loading"><van-loading type="spinner" /></div>
    <section class="comment" v-else>
        <header class="comment-header">
            <van-icon name="arrow-left" size="18rem" @click="$router.go(-1)" />
            <h3>评论({{ bookComments?.length || 0 }})</h3>
        </header>
        <ul class="comment-box" v-if="bookComments">
            <li v-for="item in bookComments">
                <header class="user-box">
                    <div class="user-img">
                        <van-image width="35rem" height="35rem" :src="item.avatar || bookComments?.[0].avatar + '?imageView&thumbnail=100y100'" :round="true" />
                    </div>
                    <div class="user-msg">
                        <div class="name">{{ item.nickName }}<span class="level">Lv.{{ item.userLevel }}</span></div>
                        <div class="rate-data">
                            <van-rate v-if="item.grade" v-model="item.grade" size="14rem" color="#ffd21e" void-icon="star" void-color="$shadowColor" readonly />
                            <span class="this-year" v-if="new Date(item.time).getFullYear() == new Date().getFullYear()">
                                {{ new Date(item.time).getMonth() + 1 }}月{{ new Date(item.time).getDate() }}日 {{ new Date(item.time).getHours() }}:{{ new Date(item.time).getMinutes() }}
                            </span>
                            <span class="else-year" v-else>
                                {{ new Date(item.time).getFullYear() }}年{{ new Date(item.time).getMonth() + 1 }}月{{ new Date(item.time).getDate() }}日
                            </span>
                        </div>
                    </div>
                    <div class="like">{{ item.likes }}<van-icon name="good-job-o" size="16rem" /></div>
                </header>
                <section class="comment-content">{{ item.comment }}</section>
                <section class="comment-content" v-if="item.select"><span class="tag">精摘书评</span>{{ item.select.substring(6) }}</section>
                <ul class="reply-box" v-if="item.replyList">
                    <li v-for="reply in item.replyList">
                        {{ reply.nickName }} 回复 {{ reply.toNickName }} ：{{ reply.comment }}
                    </li>
                </ul>
            </li>
        </ul>
        <div class="not-box" v-else>暂无评论</div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBookContentStore } from "@/stores/bookMsg";
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";

const route = useRoute()
const store = useBookContentStore()

const { bookComments } = storeToRefs(store);
const { updateComments } = store;

const loading = ref(true)
async function getMsg(){
 await updateComments(<string>route.query.queryId)
    loading.value = false
}
getMsg()
</script>

<style lang="scss" scoped>

.loading-box{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.comment {
    margin-top: 10rem;
    padding: 0 15rem;

    .comment-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30rem;

        h3 {
            font-size: 16rem;
        }

        &::after {
            content: '';
            width: 18rem;
            height: 18rem;
            display: block;
        }
    }

    .comment-box {
        &>li {
            margin-bottom: 30rem;

            .user-box {
                display: flex;

                .user-msg {
                    margin-left: 15rem;

                    .level {
                        width: 20rem;
                        margin-left: 5rem;
                        padding: 0 3rem;
                        color: #f24949;
                        border: 1px solid #f24949;
                    }

                    .rate-data {
                        margin: 10rem 0;

                        .van-rate {
                            margin-right: 10rem
                        }
                    }
                }

                .like {
                    margin-left: auto;
                }
            }
        }
    }

    .comment-content {
        margin-bottom: 10rem;
        padding-left: 50rem;

        .tag {
            margin-right: 10rem;
            padding: 0 10rem;
            color: #f8ac73;
            background-color: #ffe9d8;
        }
    }

    .reply-box {
        margin: 10rem 0 0 50rem;
        padding: 10rem 15rem;
        background-color: #ededed;

        li {
            margin-bottom: 5rem;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
.not-box{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16rem;
}
</style>