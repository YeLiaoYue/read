<template>
    <div class="rank-view">
        <header class="rank-header">
            <van-icon name="arrow-left" size="18rem" @click="$router.go(-1)" />
            <ul>
                <li v-for="item, index in rank" @click="changeRankItem(index)" :class="[rankItem == index ? 'current' : '']">{{ item.name }}</li>
            </ul>
        </header>
        <div class="middle-box">
            <van-sidebar v-model="<number>active">
                <van-sidebar-item v-for="item in rank?.[<number>rankItem].subNavis" :title="item.name" />
            </van-sidebar>
            <div class="loading" v-if="isLoading"><van-loading type="spinner" /></div>
            <div class="list-box" v-else>
                <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <div class="list-content" v-for="item, index in list" @click.stop="enterMsg(<string>item.id,<string>item.title)">
                        <van-image width="46rem" height="65rem" :src="item.cover + '?imageView&thumbnail=240y336'" />
                        <section class="msg-box">
                            <header class="msg-header">
                                <span class="title">{{ item.title }}</span>
                                <span v-if="index < 3" class="top">Top{{ index + 1 }}</span>
                                <span v-else class="top">{{ index + 1 }}</span>
                            </header>
                            <p>{{ item.recomContent || item.content }}</p>
                            <footer class="msg-footer">
                                <span>{{ item.author }} | {{ item.category }}</span>
                                <span class="like" v-if="item.clickCount != -1">{{ <number>(item.clickCount) > 10000 ? item.clickCount.toString().slice(0, -4) + '.' + (item.clickCount.toString().slice(-4, -3)  + 1) + '万' : item.clickCount }}人气</span>
                            </footer>
                        </section>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRankStore } from "@/stores/RankingList";
import { storeToRefs } from 'pinia';
import { useRoute,useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const store = useRankStore()

const { rank, rankList } = storeToRefs(store);
const { updateRank, updateRankList } = store;

const rankItem = ref(route.query.rank || 0)
async function changeRankItem(index: number) {
    rankItem.value = index
    active.value = 0
    all.value = 0
    router.replace({ path: '/rank', query: { rank: rankItem.value,rankList: active.value }})
    list.value = []
    onLoad()
}
async function getRankList() {
    if (all.value == 0) {
        isLoading.value = true
    }
    let arr = rank.value[<number>rankItem.value].subNavis[<number>active.value].naviInfos[0].url.split('=')
    arr[3] = all.value
    let url = arr.join('=')
    await updateRankList(url)
    isLoading.value = false
}
async function getRank() {
    await updateRank()
    await getRankList()
}
getRank()

const list = ref<{[key:string]:string|number}[]>([]);
const all = ref(0)
const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
    await getRankList()
    rankList.value.map((item: {[key:string]:string|number}) => list.value.push(item))
    loading.value = false;
    all.value += 20
    if (all.value >= 90) {
        finished.value = true;
    }
};

const active = ref(route.query.rankList || 0);
watch(active, async () => {
    all.value = 0
    router.replace({ path: '/rank', query: { rank: rankItem.value,rankList: active.value }})
    list.value = []
    onLoad()
})

const isLoading = ref(true)

function enterMsg(id: string,title: string) {
    if (rankItem.value == 2) {
        router.push({ path: '/particulars', query: { queryId: id,title: title  } })
    } else if (rankItem.value == 3) {
        router.push({ path: '/listenBook', query: { queryId: id } })
    } else {
        router.push({ path: '/bookMsg', query: { queryId: id } })
    }
}
</script>

<style lang="scss" scoped>
.rank-view {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.rank-header {
    height: 63rem;
    padding: 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rem solid $shadowColor;

    ul {
        width: 240rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14rem;

        .current {
            position: relative;
            top: -3rem;
            font-size: 16rem;
            font-weight: 1000;

            &::after {
                content: '';
                position: absolute;
                bottom: -5rem;
                left: 25%;
                width: 50%;
                height: 2rem;
                background-color: #f35050;
            }
        }
    }
}

.middle-box {
    width: 100vw;
    flex: 1;
    display: flex;

    .loading {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :deep(.van-sidebar) {
        height: 604rem;
        border-right: 1rem solid $shadowColor;

        .van-sidebar-item {
            background-color: $backColor;

            &::before {
                background-color: #f35050;
            }
        }
    }

    .list-box {
        height: 604rem;
        flex: 1;
        padding: 20rem;
        overflow: hidden;
        overflow-y: auto;

        .list-content {
            margin-bottom: 10rem;
            display: flex;
            justify-content: space-between;

            &:first-child {
                .msg-box {
                    .top {
                        color: #ed3424;
                    }
                }
            }

            &:nth-child(2) {
                .msg-box {
                    .top {
                        color: #ff7f00;
                    }
                }
            }

            &:nth-child(3) {
                .msg-box {
                    .top {
                        color: #ffbf00;
                    }
                }
            }

            .msg-box {
                width: 195rem;
                color: $elseFontColor;

                .msg-header {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14rem;
                    font-weight: bold;

                    .title {
                        color: $fontColorIndex;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 1;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                    }
                }

                p {
                    margin: 10rem 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }

                .msg-footer {
                    display: flex;
                    justify-content: space-between;

                    .like {
                        color: red;
                    }
                }
            }
        }
    }
}
</style>