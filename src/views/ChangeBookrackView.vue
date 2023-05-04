<template>
    <div class="change-bookrack">
        <header class="list-header">
            <div class="button" v-if="checked.length != bookrackList.length" @click="checkAll">全选({{ checked.length || 0 }})</div>
            <div class="button cancel" v-else @click="toggleAll">取消全选({{ checked.length || 0 }})</div>
            <h3>批量管理</h3>
            <div class="button" @click="$router.go(-1)">完成</div>
        </header>
        <section class="list-model">
            <van-checkbox-group v-model="checked" ref="checkboxGroup">
                <van-checkbox label-position="left" v-for="item, index in bookrackList" :name="index" checked-color="#ee0a24">
                    <div class="list">
                        <van-image width="66rem" height="95rem" :src="item.cover + '?imageView&thumbnail=270y390'" />
                        <section class="msg-box">
                            <h3>{{ item.title }}</h3>
                            <div class="author">{{ item.author }}</div>
                            <div class="chapter">
                                <span v-if="!item.chapter">
                                    <p v-if="item.type != 1">共{{ item.length }}章</p>
                                    <p v-else>共{{ item.length }}集</p>
                                </span>
                                <span v-else>
                                    <p v-if="item.type == 0">读到{{ item.chapter }}章</p>
                                    <p v-else-if="item.type == 1">听到{{ item.chapter }}集</p>
                                    <p v-else>读到{{ (item.chapter / item.length).toFixed(1) }}%</p>
                                </span>
                            </div>
                        </section>
                    </div>
                </van-checkbox>
            </van-checkbox-group>
        </section>
        <footer class="delete" :class="[checked.length > 0 ? '' : 'not']" @click="deleteBook">删除</footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const bookrackList = ref(JSON.parse(localStorage.getItem("bookrack")!))

const checked = ref<number[]>([]);
const checkboxGroup = ref();
const checkAll = () => {
    checkboxGroup.value.toggleAll(true);
}
const toggleAll = () => {
    checkboxGroup.value.toggleAll();
}

function deleteBook() {
    if (checked.value.length > 0) {
        let arr: never[] = []
        checked.value.map(item => {arr = bookrackList.value.filter((list:{},index:number)=> index!=item)})
        localStorage.setItem("bookrack", JSON.stringify(arr))
        checked.value = []
        bookrackList.value = JSON.parse(localStorage.getItem("bookrack")!)
    }
}
</script>

<style lang="scss" scoped>
.change-bookrack {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.list-header {
    padding: 15rem 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1rem 0 0 $shadowColor;

    .button {
        width: 100rem;
        font-size: 14rem;

        &:last-child {
            display: flex;
            justify-content: end;
            align-items: center;
        }
    }

    .cancel {
        color: #ed6460;
    }

    h3 {
        font-size: 16rem;
        font-weight: bold;
    }
}

.list-model {
    flex: 1;
    padding: 5rem 20rem;
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 0;
    }

    .list {
        display: flex;
        margin-bottom: 20rem;

        :deep(.van-image) {
            box-shadow: 3rem 3rem 3rem 0 $shadowColor;
        }

        .msg-box {
            width: 220rem;
            margin-left: 20rem;

            h3 {
                font-size: 16rem;
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .author {
                margin: 20rem 0 10rem;
            }
        }
    }
}

.delete {
    padding: 15rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16rem;
    color: #ed6460;
    box-shadow: 0 -1rem 0 0 $shadowColor;
}

.not {
    color: #fbc0be;
}
</style>