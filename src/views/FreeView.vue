<template>
    <div class="free-view" v-if="bookFree?.length == 2">
        <van-swipe class="my-swipe" v-if="bookFree?.[0]?.banners" :autoplay="3000" indicator-color="white" @touchstart.stop @touchend.stop>
            <van-swipe-item v-for="item in bookFree?.[0]?.banners" :key="item.id" @click.stop="enterMsg(item.id)">
                <van-image width="335rem" height="126.22rem" :src="item.cover + '?imageView&thumbnail=335y127'" radius="10rem" />
            </van-swipe-item>
        </van-swipe>
        <section class="recommend-box" v-else>
            <h3>{{ bookFree?.[0]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookFree?.[0]?.list" @click.stop="enterMsg(item.id)">
                    <van-image width="67rem" height="95rem" :src="item.cover + '?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <p>{{ item.recomContent || item.content }}</p>
                        <div>{{ item.author }} <span v-if="item.category">/ {{ item.category }}</span><span class="read">立即阅读<van-icon name="arrow" /></span></div>
                    </div>
                </section>
            </div>
        </section>
        <van-divider v-if="!bookFree?.[0]?.banners" :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookFree?.[1]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookFree?.[1]?.list" @click.stop="enterMsg(item.id)">
                    <van-image width="67rem" height="95rem" :src="item.cover + '?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }} <span v-if="item.category">/ {{ item.category }}</span></div>
                        <p>{{ item.recomContent || item.content }}</p>
                    </div>
                </section>
            </div>
        </section>
    </div>
    <div class="free-view" v-else>
        <section class="free-list">
            <header class="free-header">
                <h3>{{ bookFree?.[0]?.name }}</h3>
                <div class="count-down">
                    <van-icon name="clock-o" size="14rem" />
                    <van-count-down :time="bookFree?.[0].time_limit - Date.now()" />
                </div>
            </header>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookFree?.[0]?.list" @click.stop="enterMsg(item.id)">
                    <van-image width="98rem" height="137.19rem" :src="item.cover + '?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <p>{{ item.nwprice }} 阅点/千字</p>
                        <div>免费</div>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookFree?.[1]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookFree?.[1]?.list" @click.stop="enterMsg(item.id)">
                    <van-image width="67rem" height="95rem" :src="item.cover + '?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <p>{{ item.recomContent || item.content }}</p>
                        <div>{{ item.author }} <span v-if="item.category">/ {{ item.category }}</span><span class="read">立即阅读<van-icon name="arrow" /></span></div>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookFree?.[2]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookFree?.[2]?.list" @click.stop="enterMsg(item.id)">
                    <van-image width="67rem" height="95rem" :src="item.cover + '?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }} <span v-if="item.category">/ {{ item.category }}</span></div>
                        <p>{{ item.recomContent || item.content }}</p>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useBookTownStore } from "@/stores/bookCity";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useBookTownStore()

const { bookFree } = storeToRefs(store);
function enterMsg(id: string) {
    router.push({ path: '/bookMsg', query: { queryId: id } })
}
</script>

<style lang="scss" scoped>
.free-view {
    padding: 5rem 0 50rem;
}

.my-swipe {
    margin-bottom: 20rem;
}

.van-swipe {
    .van-swipe-item {
        margin-top: 5rem;
        display: flex;
        justify-content: center;
    }
}

.free-list {
    padding: 0 20rem;

    .free-header {
        display: flex;
        justify-content: space-between;

        h3 {
            font-size: 20rem;
            font-weight: bold;
        }

        .count-down {
            padding: 0 10rem;
            display: flex;
            align-items: center;
            color: $backColor;
            border-radius: 12rem;
            background-color: #ffa74e;

            :deep(.van-count-down) {
                margin-left: 5rem;
                color: $backColor;
            }
        }
    }


    .book-box {
        display: flex;
        justify-content: space-between;

        .recommend-list {
            width: 98rem;
            margin-top: 15rem;

            .book-msg {
                h5 {
                    margin-top: 10rem;
                    font-size: 14rem;
                }

                p {
                    margin: 10rem 0;
                    color: $elseFontColor;
                    text-decoration: line-through;
                }

                div {
                    color: #ff4a4b;
                }
            }
        }
    }
}

.recommend-box {
    padding: 0 20rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    h3 {
        font-size: 20rem;
        font-weight: bold;
    }

    .book-box {
        .recommend-list {
            width: 335rem;
            margin: 20rem 0;
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
                }

                div {
                    margin: 10rem 0;
                    display: flex;
                    font-size: 14rem;
                    color: $elseFontColor;

                    .read {
                        color: $fontColorIndex;
                        margin-left: auto;
                    }
                }

                p {
                    margin: 10rem 0;
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

        .other-box {
            .van-image {
                box-shadow: 5rem 5rem 5rem 0 $shadowColor;
            }

            .book-msg {
                width: 70rem;
                margin-top: 5rem;

                h5 {
                    font-size: 14rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }

                div {
                    color: $elseFontColor;
                }
            }
        }
    }
}
</style>