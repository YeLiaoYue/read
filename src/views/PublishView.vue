<template>
    <div class="publish-view">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @touchstart.stop @touchend.stop>
            <van-swipe-item v-for="item in bookPublish?.[0]?.banners" :key="item.id">
                <van-image width="335rem" height="126.22rem" :src="item.cover+'?imageView&thumbnail=335y127'" radius="10rem" />
            </van-swipe-item>
        </van-swipe>
        <section class="push-rank">
            <div v-for="item,index in bookPublish?.[1]?.shortCut" class="item-box" @click="pushPublishRankList(index,item.url)">
                <van-image width="45rem" height="45rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                <h5>{{ item.name }}</h5>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="ranking-list">
            <h3>{{ bookPublish?.[2]?.name }}</h3>
            <div class="book-box">
                <section class="rank-box" v-for="item, index in bookPublish?.[2]?.list">
                    <van-image class="rank-img" width="98rem" height="21.77rem" :src="`https://m.yuedu.163.com/assets/mobile/images/index18/icon_0${index + 1}.png?5c6f851f`" />
                    <van-image width="98rem" height="137.19rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                    </div>
                </section>
            </div>
            <div class="push-rank" @click="$router.push({ path: '/rank', query: { rank:2,rankList: 0 }})">查看榜单<van-icon name="arrow" size="14rem" /></div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookPublish?.[3]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookPublish?.[3]?.list">
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
            <van-image width="335rem" height="112rem" :src="bookPublish?.[4]?.cover+'?imageView&thumbnail=335y112'" radius="10rem" />
        </div>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookPublish?.[5]?.name }}</h3>
            <div class="book-box" v-for="item in bookPublish?.[5]?.list" :key="item.id">
                <section class="other-box">
                    <van-image width="70rem" height="98rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}</div>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookPublish?.[6]?.name }}</h3>
            <div class="book-box" v-for="item in bookPublish?.[6]?.list" :key="item.id">
                <section class="other-box">
                    <van-image width="70rem" height="98rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}</div>
                    </div>
                </section>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookPublish?.[7]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookPublish?.[7]?.list">
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
        <section class="recommend-box">
            <h3>{{ bookPublish?.[8]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookPublish?.[8]?.list">
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
        <section class="recommend-box">
            <h3>{{ bookPublish?.[9]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookPublish?.[9]?.list">
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
            <van-image width="335rem" height="112rem" :src="bookPublish?.[10]?.cover+'?imageView&thumbnail=335y112'" radius="10rem" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBookTownStore } from "@/stores/bookCity";
import { useRankStore } from "@/stores/RankingList";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useBookTownStore()
const rankStore = useRankStore()

const { bookPublish } = storeToRefs(store);

function pushPublishRankList(index:number,url:string){
    if(index==1){
        router.push({ path: '/rank', query: { rank: 2 }})
    }else{
        router.push({ path:'/publishRank',query: { url: url }})
    }
}
</script>

<style lang="scss" scoped>
.publish-view {
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