<template>
    <div class="listen-view">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @touchstart.stop @touchend.stop>
            <van-swipe-item v-for="item in bookListen?.[0]?.banners" :key="item.id" @click="$router.push({ path: '/listenBook', query: { queryId: item?.id } })">
                <van-image width="335rem" height="126.22rem" :src="item.cover+'?imageView&thumbnail=335y127'" radius="10rem" />
            </van-swipe-item>
        </van-swipe>
        <section class="recommend-box">
            <h3>{{ bookListen?.[1]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookListen?.[1]?.list"  @click="$router.push({ path: '/listenBook', query: { queryId: item?.id } })">
                    <van-image width="67rem" height="95rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
                        <p>{{ item.recomContent || item.content }}</p>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <div class="recommend-img">
            <van-image width="335rem" height="112rem" :src="bookListen?.[2]?.cover+'?imageView&thumbnail=335y112'" radius="10rem" />
        </div>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookListen?.[3]?.name }}</h3>
            <div class="book-box" v-for="item in bookListen?.[3]?.list" :key="item.id"  @click="$router.push({ path: '/listenBook', query: { queryId: item?.id } })">
                <section class="other-box">
                    <van-image width="70rem" height="98rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}</div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useBookTownStore } from "@/stores/bookCity";
import { storeToRefs } from "pinia";

const store = useBookTownStore()

const { bookListen } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.listen-view {
    padding-bottom: 70rem;
}

.van-swipe {
    .van-swipe-item {
        margin-top: 5rem;
        display: flex;
        justify-content: center;
    }
}

.push-rank {
    margin-top: 10rem;
    padding: 0 20rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.recommend-box {
    padding: 0 20rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    h3 {
        width: 100%;
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

        .other-box {
            margin-top: 20rem;

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

                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}

.ranking-list {
    padding: 0 20rem;

    h3 {
        font-size: 20rem;
        font-weight: bold;
    }

    .book-box {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .rank-box {
            width: 98rem;

            .rank-img {
                position: relative;
                top: 12rem;
                z-index: 9;
            }

            .book-msg {
                h5 {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }

    .push-rank {
        margin-top: 20rem;
        display: flex;
        justify-content: center;
        color: $elseFontColor;

        .van-icon {
            width: 20rem;
            height: 20rem;
            margin-left: 5rem;
            padding-left: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid $fontColorIndex;
            border-radius: 50%;
            transform: scale(0.7);
            box-sizing: border-box;
        }
    }
}

.recommend-img {
    display: flex;
    justify-content: center;
}
</style>