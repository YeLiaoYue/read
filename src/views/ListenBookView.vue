<template>
    <div class="listen-view">
        <header class="listen-header">
            <van-icon name="arrow-left" size="20rem" @click="$router.go(-1)" />
            <h3>{{ listenBookMsg?.title }}</h3>
        </header>
        <section class="img-box">
            <van-image width="116rem" height="162rem" :src="listenBookMsg?.cover + '?imageView&thumbnail=240y336'" />
        </section>
        <section class="list-name"><span v-if="current != null">{{ listenBookList?.[<number>current].title }}</span></section>
        <section class="msg-box">
            <div class="author">作者：{{ listenBookMsg?.author }}</div>
            <div class="anchor">主播：{{ listenBookMsg?.anchor }}</div>
            <div class="articleCount">集数：{{ listenBookMsg?.articleCount }}集</div>
            <div class="price">每集价格：{{ listenBookMsg?.price }}阅点</div>
        </section>
        <section class="description">
            <div class="title">书籍简介：</div>
            <p>{{ listenBookMsg?.description }}</p>
        </section>
        <section class="range-box">
            <van-slider v-model="value" @change="onChange" @update:model-value="change" active-color="#ff4b4a" :max="max == 0 ? 100 : max" />
            <div class="time-box">
                <div class="current-time">{{ parseInt((value / 60).toString()) < 10 ? '0' + parseInt((value / 60).toString()) : parseInt((value / 60).toString()) }}:{{ parseInt((value % 60).toString()) < 10 ? "0" + parseInt((value % 60).toString()) : parseInt((value % 60).toString()) }}</div>
                        <div class="max-time">{{ parseInt((max / 60).toString()) < 10 ? '0' + parseInt((max / 60).toString()) : parseInt((max / 60).toString()) }}:{{ parseInt((max % 60).toString()) < 10 ? "0" + parseInt((max % 60).toString()) : parseInt((max % 60).toString()) }}</div>
                        </div>
        </section>
        <section class="control">
            <div class="list iconfont" @click="showBottom = true">&#xe622;</div>
            <div class="prev iconfont" @click="prev">&#xea88;</div>
            <div class="play iconfont" @click="playListen">&#xe624;</div>
            <div class="next iconfont" @click="next">&#xea7f;</div>
            <div class="time "><van-icon name="clock-o" size="20rem" /></div>
        </section>
        <footer class="listen-footer">
            <div class="button" @click="addToBookrack" v-if="showAdd">
                <span class="iconfont">&#xe7ef;</span>
                <div class="name">
                    加入书架
                </div>
            </div>
            <div class="button already" v-else>
                <span class="iconfont">&#xe7ef;</span>
                <div class="name">
                    已在书架
                </div>
            </div>
            <div class="button" @click="$router.push({ path: '/bookMsg', query: { queryId: listenBookMsg.relate.relateId } })" v-if="listenBookMsg?.relate?.relateId">
                <span class="iconfont">&#xe63a;</span>
                <div class="name">
                    阅读书籍
                </div>
            </div>
            <div class="button download">
                <van-icon name="upgrade" size="20rem" />
                <div class="name">
                    批量下载
                </div>
            </div>
            <div class="button" @click="$router.push({ path: '/comment', query: { queryId: <string>route.query.queryId } })">
                <van-icon name="chat-o" size="16rem" />
                <div class="name">
                    评论
                </div>
            </div>
        </footer>
        <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '400rem' }">
            <header class="list-header">
                <div class="title">目录</div>
                <van-icon name="cross" size="20rem" @click="showBottom = false" />
            </header>
            <section class="list-box">
                <ul>
                    <li class="list" v-for="item, index in listenBookList" :class="[item.needPay == 0 ? '' : 'need-pay', current == index ? 'current' : '']" @click="changeCurrent(index)">
                        <div class="left">
                            <div class="free" v-if="item.needPay == 0">免费</div>
                            <div class="pay" v-else>收费</div>
                            <div class="title">{{ item.title }}</div>
                        </div>
                        <div class="icon">
                            <van-icon name="upgrade" size="20rem" />
                        </div>
                    </li>
                </ul>
            </section>
        </van-popup>
        <audio :src="listen?.[<number>current]?.downloadUrl" autoplay ref="audio" @timeupdate="timeupdate"></audio>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { useListenBookStore } from "@/stores/listenBook";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute()
const store = useListenBookStore()

const { listenBookMsg, listenBookList, listen } = storeToRefs(store);
const { updateListenBookMsg, updateListenBookList, updateListen } = store;

async function getMsg() {
    await updateListenBookMsg(<string>route.query.queryId)
    await updateListenBookList(<string>route.query.queryId)
    await updateListen()
}
getMsg()


const value = ref(0);
const changeRange = ref(false);
const change = () => {
    changeRange.value = true
}
const onChange = () => {
    audio.value.currentTime = value.value
    changeRange.value = false
}

const showBottom = ref(false)

const current = ref<number | null>(null)
const audio = ref()
const max = ref(0)
function playListen() {
    if (current.value == null) {
        current.value = 0
    } else {
        if (audio.value.paused) {
            audio.value.play()
        } else {
            audio.value.pause()
        }
    }
}
function timeupdate() {
    if (changeRange.value == false) {
        value.value = audio.value.currentTime
    }
}
const prev = () => {
    if (current.value != null) {
        if (current.value != 0) {
            current.value--
        }
    } else {
        current.value = 0
    }
}
const next = () => {
    if (current.value != null) {
        current.value++
    } else {
        current.value = 0
    }
}

const changeCurrent = (index: number) => {
    current.value = index
}

function setItem() {
    if (listenBookMsg.value) {
        localStorage.setItem('bookrack', JSON.stringify([{ id: <string>route.query.queryId, title: listenBookMsg.value?.title, cover: listenBookMsg.value?.cover, length: listenBookMsg.value?.articleCount, chapter: current.value == null ? null : current.value + 1, type: 1, author: listenBookMsg.value.anchor }, ...JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id != <string>route.query.queryId) || []]))
    }
}
watch(current, () => {
    audio.value.ondurationchange = () => {
        value.value = audio.value.currentTime
        max.value = audio.value.duration
    }
    if (JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id == <string>route.query.queryId)) {
        setItem()
    }
})

const showAdd = ref(JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id == <string>route.query.queryId).length > 0 ? false : true)
const addToBookrack = () => {
    setItem()
    showAdd.value = false
}

onBeforeUnmount(() => {
    localStorage.setItem("record", JSON.stringify([{ id: listenBookMsg.value?.sourceUuid, 'chapter': current.value, time: Date.now(), author: listenBookMsg.value?.anchor, title: listenBookMsg.value.title }, ...JSON.parse(localStorage.getItem('record')!)?.filter((item: { id: string; }) => item.id != listenBookMsg.value.sourceUuid) || []]))
    localStorage.setItem('bookrack', JSON.stringify([{ id: listenBookMsg.value?.sourceUuid, title: listenBookMsg.value?.title, cover: listenBookMsg.value?.cover, length: listenBookList.value?.length, chapter: current.value == null ? null : current.value + 1, type: 1, author: listenBookMsg.value.anchor }, ...JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id != listenBookMsg.value.sourceUuid) || []]))
})
</script>

<style lang="scss" scoped>
.listen-view {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, #42403f, #221e1c);
}

.listen-header {
    margin-bottom: 30rem;
    padding: 20rem 20rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16rem;
    font-weight: bold;
    color: #fff;

    &::after {
        content: '';
        width: 20rem;
        height: 20rem;
        display: flex;
    }
}

.img-box {
    display: flex;
    justify-content: center;
}

.list-name {
    width: 100vw;
    height: 20rem;
    margin-top: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14rem;
    color: #fff;
}

.msg-box {
    width: 100vw;
    margin-top: 15rem;
    padding: 0 20rem;
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    font-size: 14rem;

    div {
        width: 50%;
        margin-bottom: 15rem;
    }
}

.description {
    padding: 0 20rem;
    font-size: 14rem;
    color: #666;

    p {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        white-space: pre-wrap;
    }
}

.range-box {
    width: 100vw;
    margin-top: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    :deep(.van-slider) {
        width: 345rem;

        .van-slider__button {
            width: 15rem;
            height: 15rem;
            display: flex;
            justify-content: center;
            align-items: center;

            &::after {
                content: '';
                width: 5rem;
                height: 5rem;
                display: block;
                border-radius: 50%;
                background-color: #ed6460;
            }
        }
    }

    .time-box {
        margin-top: 8rem;
        width: 100vw;
        padding: 0 10rem;
        display: flex;
        justify-content: space-between;
        color: #fff;
    }
}

.control {
    height: 60rem;
    padding: 0 30rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .list,
    .time {
        font-size: 16rem;
    }

    .prev,
    .next {
        font-size: 22rem;
    }

    .play {
        font-size: 60rem;
    }
}

.listen-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 60rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    box-shadow: 0 -1rem 0 0 $shadowColor;

    .button {
        display: flex;
        flex-direction: column;
        align-items: center;

        .iconfont{
            font-size: 20rem;
        }
        .name {
            margin-top: 10rem;
        }
    }

    .already {
        color: #666;
    }

    .download {
        :deep(.van-icon) {
            transform: rotate(180deg);
        }
    }
}

:deep(.van-popup) {
    background: linear-gradient(to right, #42403f, #221e1c);
    overflow: hidden;

    .list-header {
        position: relative;
        padding: 15rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        font-size: 16rem;
        color: #666;
        font-weight: bold;

        &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: '';
            width: 100vw;
            height: 1rem;
            display: block;
            background-color:#fff;
        }
    }

    .list-box {
        height: 100%;
        padding-bottom: 51rem;
        overflow: hidden;
        overflow-y: auto;

        .list {
            position: relative;
            height: 45rem;
            padding: 0 25rem 0 15rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            font-size: 14rem;

            .van-icon {
                transform: rotate(180deg) !important;
            }

            .left {
                display: flex;

                .free {
                    padding: 2rem 5rem;
                    font-size: 12rem;
                    background-color: #ed6460;
                }

                .pay {
                    padding: 2rem 5rem;
                    font-size: 12rem;
                    border: 1rem solid $elseFontColor;
                }

                .title {
                    width: 260rem;
                    margin-left: 10rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            &::after {
                position: absolute;
                bottom: 0;
                left: 0;
                content: '';
                width: 100vw;
                height: 1rem;
                display: block;
                background-color: $elseFontColor;
            }

            &:last-child {
                &::after {
                    display: none;
                }
            }
        }

        .icon {
            color: #fff;
        }

        .need-pay {
            color: #6666;

            .icon {
                color: $elseFontColor;
            }
        }

        .current {
            color: #ed6460;
        }
    }
}
</style>