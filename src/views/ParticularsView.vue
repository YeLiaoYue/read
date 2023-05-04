<template>
    <div class="particulars-view">
        <header class="return-box">
            <van-icon name="arrow-left" size="20rem" @click="$router.go(-1)" />
        </header>
        <van-divider :style="{ borderColor: '$shadowColor' }" />
        <section class="loading-box" v-if="isShow">
            <div class="loading"><van-loading type="spinner" /></div>
        </section>
        <div class="middle-box" v-else>
            <section class="book-msg-box">
                <van-image width="90" height="130rem" :src="bookSub?.link[2].href + '?imageView&thumbnail=270y390'" />
                <div class="msg">
                    <h1>{{ bookSub?.title }}</h1>
                    <p class="category-author">{{ bookSub?.['pris:book'].category }} | <span class="author">{{ bookSub?.author.name }}</span></p>
                    <van-rate v-model="value" size="14rem" color="#ffd21e" void-icon="star" void-color="$shadowColor" readonly />
                    <p class="count">{{ bookSub?.link[9].length > 10000 ? bookSub?.link[9].length.toString().slice(0, -4) + '.' + (bookSub?.link[9].length.toString().slice(-4, -3) * 1 + 1) + '万字' : bookSub?.link[9].length }} {{ bookSub?.['pris:subscribe'].clicksCount }}点击</p>
                    <p class="price" v-if="bookSub?.['pris:book'].price">{{ bookSub?.['pris:book'].price }}阅点</p>
                    <p class="price" v-else>{{ bookSub?.['pris:book'].wprice }}阅点/千字</p>
                </div>
            </section>
            <section class="brief-introduction">
                <div class="is-show">
                    <p class="summary" :class="[showMsg ? '' : 'astrict']">{{ bookSub?.summary }}</p>
                    <span v-if="!showMsg" @click="changeShowMsg"><van-icon name="arrow-down" size="16rem" /></span>
                </div>
                <footer class="msg-footer" v-if="showMsg">
                    <p class="authorizer">授权方：{{ bookSub?.['pris:book'].authorizer }}</p>
                    <p>作品类型：{{ bookSub?.['pris:book'].paydesc }}</p>
                </footer>
            </section>
            <van-divider :style="{ borderColor: '$shadowColor', padding: '0 10rem' }" />
            <section class="book-list" @click="pushCatalogue">
                <span class="icon">目</span>
                <span class="num">共{{ bookSub?.['pris:book'].totalArticleCount[0] }}章</span>
                <span class="new-chapter" v-if="bookSub?.['pris:book'].integrity != 1">更至：{{ bookNewChapter?.latestArticleTitle }}</span>
                <span class="is-integrity">
                    <span class="integrity" v-if="bookSub?.['pris:book'].integrity == 1">已完结</span>
                    <span class="serialize" v-else>连载中</span>
                    <van-icon name="arrow" size="14rem" />
                </span>
            </section>
            <section class="comment">
                <header class="comment-header">
                    <h3>评论</h3>
                </header>
                <ul class="comment-box">
                    <li v-for="item in bookComments?.slice(0, 5)">
                        <header class="user-box">
                            <div class="user-img">
                                <van-image width="35rem" height="35rem" :src="bookComments?.[0].avatar + '?imageView&thumbnail=100y100'" :round="true" />
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
                <footer class="more-comment" @click="pushComment" v-if="bookComments?.length != 0">查看全部评论</footer>
                <footer class="no-comment" v-else>还没有评论</footer>
            </section>
        </div>
        <footer class="view-footer">
            <div class="button" @click="addToBookrack" v-if="showAdd">加入书架</div>
            <div class="button already" v-else>已在书架</div>
            <div class="button" @click.stop="enterMsg()">免费试读</div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBookContentStore } from "@/stores/bookMsg";
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from "pinia";

const router = useRouter()
const route = useRoute()
const store = useBookContentStore()

const { bookSub, bookNewChapter, bookComments } = storeToRefs(store);
const { updateSub, updateNewChapter, updateComments } = store;

const showMsg = ref(false)
const changeShowMsg = function () {
    showMsg.value = !showMsg.value
}

const isShow = ref(true)
const value = ref(5)
const getSub = async () => {
    await updateSub(<string>route.query.queryId, <string>route.query.title)
    await updateNewChapter(<string>route.query.queryId)
    await updateComments(<string>route.query.queryId)
    value.value = Math.ceil(bookSub.value['pris:ranking'].value)
    isShow.value = false
}
getSub()

function enterMsg() {
    router.push({ path: '/bookMsg', query: { queryId: <string>route.query.queryId } })
}

function pushCatalogue() {
    router.push({ path: '/catalogue', query: { queryId: <string>route.query.queryId } })
}

function pushComment() {
    router.push({ path: '/comment', query: { queryId: <string>route.query.queryId } })
}

const showAdd = ref(JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id == <string>route.query.queryId).length > 0 ? false : true)
function addToBookrack() {
    function getType() {
        if ((<string>route.query.queryId).split('_')[0] == ('bd' || 'ts')) {
            return 0
        } else if ((<string>route.query.queryId).split('_')[0] == 'audio') {
            return 1
        } else {
            return 2
        }
    }
    let type = getType()

    localStorage.setItem('bookrack',
        JSON.stringify([{
            id: <string>route.query.queryId,
            title: bookSub.value.title,
            cover: bookSub.value?.link[2].href,
            length: bookSub.value?.['pris:book'].totalArticleCount[0],
            chapter: JSON.parse(localStorage.getItem('record')!)?.filter((item: { id: string; }) => item.id == <string>route.query.queryId)?.[0]?.chapter || null,
            type,
            author: bookSub.value.author.name
        },
        ...JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id != <string>route.query.queryId) || []]))
    showAdd.value = false
}
</script>

<style lang="scss" scoped>
.particulars-view{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .loading-box{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.return-box {
    padding: 15rem 10rem 0;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
}

.book-msg-box {
    padding: 10rem;
    display: flex;

    :deep(.van-image) {
        margin-right: 15rem;
    }

    .msg {
        width: 261rem;

        h1 {
            font-size: 16rem;
            font-weight: bold;
        }

        .category-author {
            display: flex;
            margin: 6rem 0;

            .author {
                width: 210rem;
                color: #6bafee;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
        }

        .count {
            margin: 6rem 0;
        }

        .price {
            font-size: 16rem;
        }
    }
}

.brief-introduction {
    padding: 0 10rem;

    .is-show {
        display: flex;
        justify-content: space-between;
        align-items: end;

        p {
            font-size: 14rem;
            white-space: pre-wrap
        }

        .astrict {
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
    }

    .msg-footer {
        margin-top: 15rem;

        .authorizer {
            margin-bottom: 5rem;
        }
    }
}

.book-list {
    width: 100vw;
    padding: 0 10rem 10rem;
    display: flex;
    box-sizing: border-box;

    .icon {
        margin-right: 15rem;
    }

    .new-chapter {
        width: 200rem;
        margin-left: 10rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .is-integrity {
        margin-left: auto;

        span {
            margin-right: 15rem;
        }

        .integrity {
            color: #f24949;
        }

        .serialize {
            color: #449c37;
        }
    }
}

.comment {
    margin-top: 10rem;
    padding: 0 15rem;

    .comment-header {
        margin-bottom: 30rem;

        h3 {
            font-size: 16rem;
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

.no-comment {
    font-size: 16rem;
    text-align: center;
}

.more-comment {
    width: 135rem;
    height: 35rem;
    margin: 40rem auto 90rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16rem;
    border: 1px solid #747370;
}

.view-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: flex;
    background-color: $backColor;

    .button {
        width: 50%;
        height: 50rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14rem;
        box-shadow: 0 -.5rem 0 0 $shadowColor;

        &:last-child {
            color: $backColor;
            background-color: #f24949;
        }
    }

    .already {
        color: $elseFontColor;
    }
}
</style>