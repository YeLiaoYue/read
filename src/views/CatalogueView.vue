<template>
    <div class="catalogueView-view">
        <header class="view-header">
            <van-icon name="arrow-left" size="18rem" @click="$router.go(-1)" />
            <h3>目录</h3>
        </header>
        <section class="sidebar">
            <header class="content-header">
                <van-image width="67rem" height="95rem" :src="bookMsg?.cover + '?imageView&thumbnail=240y336'" />
                <div class="msg">
                    <section class="title">{{ bookMsg?.title }}</section>
                    <section class="author">{{ bookMsg?.author }}</section>
                </div>
            </header>
            <div class="middle-box">
                <div class="list-length">共{{ bookList?.length }}章</div>
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in bookList" :class="[item.grade == 1 && item.leaf == false ? 'title' : '', (item.grade != 1?true:item.leaf==true)&&item.needPay ? 'need-pay' : '']" @click.stop="enterMsg(item.grade, item.leaf, item.uuid)">{{ item.title }}</li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useBookContentStore } from "@/stores/bookMsg";
import { storeToRefs } from "pinia";
import { useRoute,useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const store = useBookContentStore()
const { bookList, bookMsg } = storeToRefs(store);
const { updateBookList, updateMsg } = store;

const getBookList = async () => {
    await updateBookList(<string>route.query.queryId)
}
getBookList()

const getBookMsg = async () => {
    await updateMsg(<string>route.query.queryId)
}
getBookMsg()

function enterMsg(grade: number, leaf: boolean, id: string) {    
    if (grade != 1?true:leaf==true) {
        let chapter = 0
        bookList.value.filter((item: { grade: number,leaf:boolean }) => item.grade!=1?true:item.leaf==true).map((item: { uuid: string }, index: number) => { if (item.uuid == id) { chapter = index } })
        localStorage.setItem("record", JSON.stringify([{ id: <string>route.query.queryId, 'chapter': chapter }, ...JSON.parse(localStorage.getItem('record')!)?.filter((item: { id: string; }) => item.id != <string>route.query.queryId) || []]))
        router.push({ path: '/bookMsg', query: { queryId: <string>route.query.queryId } })
        }
    }
</script>

<style lang="scss" scoped>
.catalogueView-view {
    background-color: $backColor;
}

.view-header {
    height: 50rem;
    padding: 0 20rem;
    font-size: 16rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::after {
        content: '';
        width: 18rem;
        height: 18rem;
        display: block;
    }
}

.sidebar {
    width: 100vw;
    height: 100vh;
    background-color: $backColor;

    .content-header {
        width: 100vw;
        padding: 20rem;
        display: flex;
        align-items: center;
        background-color: $backColor;
        box-sizing: border-box;

        .msg {
            flex: 1;
            margin-left: 30rem;

            .title {
                font-size: 16rem;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }

            .author {
                margin-top: 10rem;
                font-size: 14rem;
                color: $elseFontColor;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
        }
    }

    .middle-box {
        position: relative;
        top: -1rem;
        width: 100vw;
        padding: 0 20rem 20rem;
        font-size: 14rem;
        font-weight: bold;
        background-color: $backColor;
    }

    .content {
        position: relative;
        top: -1rem;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        overflow-y: scroll;
        z-index: 999;
        box-sizing: border-box;

        &::-webkit-scrollbar {
            width: 12rem;
            background-color: $backColor;
        }

        &::-webkit-scrollbar-thumb {
            width: 12rem;
            height: 40rem;
            border-radius: 6rem;
            background-color: $elseFontColor;
        }
    }

    ul {
        width: 100vw;
        background-color: $backColor;

        li {
            margin-left: 20rem;
            padding: 15rem 0 15rem 20rem;
            font-size: 16rem;
            border-top: 1rem dashed $fontColorIndex;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:first-child {
                border: none;
            }
        }

        .current {
            color: #e64d2e;
        }

        .title {
            margin-left: 0;
            padding: 8rem 0 8rem 20rem;
            font-size: 14rem;
            border: none;
            background-color: $shadowColor;
        }

        .title+li {
            border: none;
        }

        .need-pay {
            position: relative;
            color: $elseFontColor;
            padding-right: 30rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            
            &::after {
                position: absolute;
                right: 22rem;
                line-height: 22rem;
                content: '1';
                text-align: end;
            }
        }
    }
}
</style>