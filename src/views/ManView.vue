<template>
    <div class="man-view">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @touchstart.stop @touchend.stop>
            <van-swipe-item v-for="item in bookMan?.[0]?.banners" :key="item.id"  @click.stop="enterMsg(item.id)">
                <van-image width="335rem" height="126.22rem" :src="item.cover+'?imageView&thumbnail=335y127'" radius="10rem" />
            </van-swipe-item>
        </van-swipe>
        <section class="recommend-box">
            <h3>{{ bookMan?.[1]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookMan?.[1]?.list" @click.stop="enterMsg(item.id)">
                    <van-image  width="67rem" height="95rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
                        <p>{{ item.recomContent || item.content }}</p>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookMan?.[2]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookMan?.[2]?.list" @click.stop="enterMsg(item.id)">
                    <van-image  width="67rem" height="95rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
                        <p>{{ item.recomContent || item.content }}</p>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookMan?.[3]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookMan?.[3]?.list" @click.stop="enterMsg(item.id)">
                    <van-image  width="67rem" height="95rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
                        <p>{{ item.recomContent || item.content }}</p>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="ranking-list">
            <h3>{{ bookMan?.[4]?.name }}</h3>
            <div class="book-box">
                <section class="rank-box" v-for="item, index in bookMan?.[4]?.list" @click.stop="enterMsg(item.id)">
                    <van-image class="rank-img" width="98rem" height="21.77rem" :src="`https://m.yuedu.163.com/assets/mobile/images/index18/icon_0${index + 1}.png?5c6f851f`" />
                    <van-image width="98rem" height="137.19rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                    </div>
                </section>
            </div>
            <div class="push-rank"  @click="$router.push({ path: '/rank', query: { rankList: 0 }})">查看榜单<van-icon name="arrow" size="14rem" /></div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookMan?.[5]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookMan?.[5]?.list" @click.stop="enterMsg(item.id)">
                    <van-image  width="67rem" height="95rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
                        <p>{{ item.recomContent || item.content }}</p>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="ranking-list">
            <h3>{{ bookMan?.[6]?.name }}</h3>
            <div class="book-box">
                <section class="rank-box" v-for="item, index in bookMan?.[6]?.list" @click.stop="enterMsg(item.id)">
                    <van-image class="rank-img" width="98rem" height="21.77rem" :src="`https://m.yuedu.163.com/assets/mobile/images/index18/icon_0${index + 1}.png?5c6f851f`" />
                    <van-image width="98rem" height="137.19rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                    </div>
                </section>
            </div>
            <div class="push-rank"  @click="$router.push({ path: '/rank', query: { rankList: 4 }})">查看榜单<van-icon name="arrow" size="14rem" /></div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useBookTownStore } from "@/stores/bookCity";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useBookTownStore()

const { bookMan } = storeToRefs(store);

function enterMsg(id:string){
    router.push({ path: '/bookMsg', query: { queryId: id }})
}
</script>

<style lang="scss" scoped>
.man-view {
    padding-bottom: 70rem;
}
.van-swipe {
        margin: 5rem 0 20rem;
    .van-swipe-item {
        display: flex;
        justify-content: center;
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
                    font-size: 14rem;
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
</style>