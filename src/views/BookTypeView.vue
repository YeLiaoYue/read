<template>
    <div class="type-view">
        <header class="view-header">
            <ul class="type-box">
                <li v-for="(item, index) in bookType" @click="changeType(index)" :class="[type == index ? 'current' : '']">{{ item.name }}</li>
            </ul>
            <van-icon name="search" size="24rem" @click="$router.push('/search')" />
        </header>
        <ul class="typeItem-box" v-if="showItem">
            <li v-for="item, index in bookTypeItem" @click="changeTypeItem(index)" :class="[typeItem == index ? 'current' : '']">{{ item.name }}</li>
        </ul>
        <div class="screen-box">
            <span :class="sort == 1 ? 'current' : ''" @click="changeSort(1)">畅销</span><i class="icon">|</i><span :class="sort == 3 ? 'current' : ''" @click="changeSort(3)">最新</span>
            <van-dropdown-menu active-color="$fontColorIndex">
                <van-dropdown-item title="筛选" ref="item">
                    <ul class="catArray-box" v-for="list in bookTypeItemScreen.filter((item: { 'type': string }) => item.type != 'sort')">
                        <li v-for="item in list.catArray"
                            :class="[list.type == 'pay' && pay == item.value ? 'current' : '', list.type == 'bookStatus' && bookStatus == item.value ? 'current' : '', list.type == 'wordCount' && wordCount == item.value ? 'current' : '', list.type == 'subCat' && subCat == item.value ? 'current' : '']"
                            @click="changeCat(list.type, item.value)">{{ item.name }}</li>
                    </ul>
                </van-dropdown-item>
            </van-dropdown-menu>
        </div>
        <div class="loading" v-if="isLoading"><van-loading type="spinner" /></div>
        <div class="scroll"  v-else>
        <ul class="content-list">
            <li v-if="!bookTypeItemRecord" class="not">没有找到你想要的内容</li>
            <li v-for="item in bookTypeItemRecord" v-else @click.stop="enterMsg(item.id)">
                <van-image width="95rem" height="133rem" :src="item.cover" />
                <p class="title">{{ item.title }}</p>
                <p class="author">{{ item.author }}</p>
            </li>
        </ul>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute,useRouter } from 'vue-router';
import { useBookTypeStore } from "@/stores/bookClassification";
import { storeToRefs } from "pinia";

const router = useRouter()
const route = useRoute()
const store = useBookTypeStore()

const { bookType, bookTypeItem, bookTypeItemScreen, bookTypeItemRecord } = storeToRefs(store);
const { updateType, updateTypeItem, updateTypeItemScreen, updateTypeItemRecord } = store;

const type = ref(route.query.queryId || 0)
async function changeType(num: number) {
    type.value = num
    router.replace({ path: '/bookType', query: { queryId: type.value } })
    pay.value = 0
    bookStatus.value = 0
    wordCount.value = 0
    subCat.value = 0
    typeItem.value = 0
    showItem.value = false
    isLoading.value = true
    await updateTypeItem(bookType.value[type.value].node[0].url)
    await updateTypeItemScreen(bookTypeItem.value[typeItem.value].url)
    showItem.value = true
    await updateTypeItemRecord(bookTypeItem.value[typeItem.value].url.split("=")[1], wordCount.value, pay.value, bookStatus.value, sort.value)
    isLoading.value = false
}

const showItem = ref(false)
async function getMsg() {
    await updateType()
    await updateTypeItem(bookType.value[<number>type.value].node[0].url)
    showItem.value = true
    await updateTypeItemScreen(bookTypeItem.value[typeItem.value].url)
    await updateTypeItemRecord(bookTypeItem.value[typeItem.value].url.split("=")[1], wordCount.value, pay.value, bookStatus.value, sort.value)
    isLoading.value = false
}
getMsg()

const typeItem = ref(0)
async function changeTypeItem(num: number) {
    typeItem.value = num
    isLoading.value = true
    updateTypeItemScreen(bookTypeItem.value[typeItem.value].url)
    await updateTypeItemRecord(bookTypeItem.value[typeItem.value].url.split("=")[1], wordCount.value, pay.value, bookStatus.value, sort.value)
    isLoading.value = false
}

const isLoading = ref(true)
const item = ref()
const sort = ref(1)
async function changeSort(num: number) {
    sort.value = num
    isLoading.value = true
    await updateTypeItemRecord(bookTypeItem.value[typeItem.value].url.split("=")[1], wordCount.value, pay.value, bookStatus.value, sort.value)
    isLoading.value = false
}
const pay = ref(0)
const bookStatus = ref(0)
const wordCount = ref(0)
const subCat = ref(0)
async function changeCat(type: string, value: number) {
    if (type == 'pay') {
        pay.value = value
    } else if (type == "bookStatus") {
        bookStatus.value = value
    } else if (type == "wordCount") {
        wordCount.value = value
    } else {
        subCat.value = value
    }
    isLoading.value = true
    item.value.toggle();
    if (type != 'subCat') {
        await updateTypeItemRecord(bookTypeItem.value[typeItem.value].url.split("=")[1], wordCount.value, pay.value, bookStatus.value, sort.value)
    } else {
        await updateTypeItemRecord(subCat.value, wordCount.value, pay.value, bookStatus.value, sort.value)
    }
    isLoading.value = false
}

function enterMsg(id: string) {
    if (type.value == 2) {
        router.push({ path: '/particulars', query: { queryId: id } })
    } else if (type.value == 3) {
        router.push({ path: '/listenBook', query: { queryId: id } })
    } else {
        router.push({ path: '/bookMsg', query: { queryId: id } })
    }
}
</script>

<style lang="scss" scoped>
.type-view {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.view-header {
    height: 50rem;
    padding: 0 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    .type-box {
        width: 170rem;
        height: 50rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16rem;
        color: $fontColorSecond;

        .current {
            color: $fontColorIndex;
            font-weight: bold;
        }
    }
}

.typeItem-box {
    padding: 20rem 20rem 0;
    display: flex;
    flex-wrap: wrap;
    background-color: $boxColor;

    li {
        margin: 0 19rem 20rem 0;
        font-size: 14rem;
    }

    .current {
        position: relative;
        color: #ff494d;

        &::after {
            content: '';
            position: absolute;
            bottom: -2rem;
            left: 25%;
            width: 50%;
            height: 2rem;
            background-color: #ff494d;
        }
    }
}

.screen-box {
    height: 50rem;
    padding: 15rem 20rem;
    display: flex;
    font-size: 14rem;
    box-sizing: border-box;

    .icon {
        margin: 0 10rem;
    }

    :deep(.van-dropdown-menu) {
        width: 70rem;
        height: 20rem;
        margin-left: auto;
        padding-right: 10rem;
        border: 1px solid $elseFontColor;
        border-radius: 10rem;

        .van-dropdown-menu__bar {
            height: 20rem;
            background: none;
            box-shadow: none;
        }

        .van-ellipsis {
            font-size: 12rem;
        }
    }

    .catArray-box {
        padding: 0 20rem;
        display: flex;
        flex-wrap: wrap;
        font-size: 14rem;
        color: $elseFontColor;

        li {
            margin: 10rem 0;
            display: flex;
            align-items: center;

            &::after {
                content: '';
                width: 5rem;
                height: 5rem;
                margin: 0 5rem;
                display: block;
                border-radius: 50%;
                background-color: $elseFontColor;
            }

            &:last-child {
                &::after {
                    content: '';
                    display: none;
                }
            }
        }
    }

    .current {
        color: #ff494d;
    }
}

.loading {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.scroll{
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar{
        width: 0;
    }
}
.content-list {
    padding: 0 20rem 50rem;
    display: flex;
    flex-wrap: wrap;

    li {
        width: 95rem;
        margin: 0 25rem 20rem 0;
        &:nth-child(3n){
            margin-right: 0;
        }

        .van-image {
            box-shadow: 5rem 5rem 5rem 0 $shadowColor;
        }

        .title {
            font-size: 14rem;
            font-weight: bold;
            margin: 10rem 0;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }

        .author{
            color: $elseFontColor;
        }
    }

    .not {
        width: 100%;
        height: 400rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16rem;
    }
}
</style>