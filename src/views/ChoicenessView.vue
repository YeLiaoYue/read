<template>
    <div class="choiceness-view">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @touchstart.stop @touchend.stop>
            <van-swipe-item v-for="item in bookChoiceness?.[0]?.banners" :key="item.id" @click.stop="enterMsg(item.id)">
                <van-image width="335rem" height="126.22rem" :src="item.cover+'?imageView&thumbnail=335y127'" radius="10rem" />
            </van-swipe-item>
        </van-swipe>
        <section class="push-rank">
            <div v-for="item,index in bookChoiceness?.[1]?.shortCut" class="item-box" @click="pushRank(item.url,index)">
                <van-image width="45rem" height="45rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                <h5>{{ item.name }}</h5>
            </div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookChoiceness?.[2]?.name }}</h3>
            <div class="book-box" v-for="(item, index) in bookChoiceness?.[2]?.list" :key="item.id" >
                <section class="recommend-list" v-if="index == 0" @click.stop="enterMsg(item.id)">
                    <van-image width="80rem" height="112rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
                        <p>{{ item.recomContent || item.content }}</p>
                    </div>
                </section>
                <section class="other-box" v-else @click.stop="enterMsg(item.id)">
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
            <h3>{{ bookChoiceness?.[3]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookChoiceness?.[3]?.list" @click.stop="enterMsg(item.id)">
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
            <h3>{{ bookChoiceness?.[4]?.name }}</h3>
            <div class="book-box">
                <section class="rank-box" v-for="item, index in bookChoiceness?.[4]?.list" @click.stop="enterMsg(item.id)">
                    <van-image class="rank-img" width="98rem" height="21.77rem" :src="`https://m.yuedu.163.com/assets/mobile/images/index18/icon_0${index + 1}.png?5c6f851f`" />
                    <van-image width="98rem" height="137.19rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                    </div>
                </section>
            </div>
            <div class="push-rank"  @click="$router.push({ path: '/rank', query: { rankList: 1 }})">查看榜单<van-icon name="arrow" size="14rem" /></div>
        </section>
        <van-divider :style="{ height: '2rem', borderColor: '$shadowColor', padding: '0 20rem' }" />
        <section class="recommend-box">
            <h3>{{ bookChoiceness?.[5]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookChoiceness?.[5]?.list" @click.stop="enterMsg(item.id)">
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
            <h3>{{ bookChoiceness?.[6]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookChoiceness?.[6]?.list" @click.stop="enterMsg(item.id)">
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
            <h3>{{ bookChoiceness?.[7]?.name }}</h3>
            <div class="book-box">
                <section class="rank-box" v-for="item, index in bookChoiceness?.[7]?.list" @click.stop="enterMsg(item.id)">
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
            <h3>{{ bookChoiceness?.[8]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookChoiceness?.[8]?.list" @click.stop="enterMsg(item.id)">
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
            <h3>{{ bookChoiceness?.[9]?.name }}</h3>
            <div class="book-box">
                <section class="recommend-list" v-for="item in bookChoiceness?.[9]?.list" @click.stop="enterMsg(item.id)">
                    <van-image width="67rem" height="95rem" :src="item.cover+'?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
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

const { bookChoiceness } = storeToRefs(store);

function enterMsg(id:string){
    router.push({ path: '/bookMsg', query: { queryId: id }})
}

function pushRank(url:string,index:number){
    if(index==0){
        router.push({ path: '/rank', query: { rankList: 1 }})
    }else if(index==1){
        router.push({ path: '/rank', query: { rankList: 0 }})
    }else if(index==2){
        router.push({ path: '/rank', query: { rankList: 4 }})
    }else{
        router.push({ path:'/competitiveProducts',query: { url: url }})
    }
}
</script>

<style lang="scss" scoped>
.choiceness-view {
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

            &:first-child {
                margin: 20rem 0;
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