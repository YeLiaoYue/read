<template>
    <header class="history-header">
        <van-icon name="arrow-left" size="20rem" @click="$router.go(-1)" />
        <h3>阅读历史</h3>
        <div class="button" @click="changeShowPopup">清空</div>
    </header>
    <div class="delete-record" v-if="showPopup" @click="changeShowPopup">
        <section class="delete-remind">
            <p>是否清空阅读记录?</p>
            <div class="button-box">
                <div class="button cancel" @click.stop="changeShowPopup">取消</div>
                <div class="button delete" @click="deleteRecord">删除</div>
            </div>
        </section>
    <van-divider :style="{ borderColor: '#ccc' }" />
    </div>
        <ul  class="history-box">
            <li v-for="item in historyList" @click="entry(item.id)">
                <h3>{{ item.title }}</h3>
                <footer class="msg-footer">
                    <span>{{ item.author }}</span>
                    <span v-if="new Date(item.time).getDate() == new Date().getDate()">今天{{ new Date(item.time).getHours() < 10 ? '0' + new Date(item.time).getHours() : new Date(item.time).getHours() }}:{{ new Date(item.time).getMinutes() < 10 ? '0' + new Date(item.time).getMinutes() : new
                        Date(item.time).getMinutes() }}</span>
                            <span v-else>{{ new Date(item.time).getMonth() + 1 }}月{{ new Date(item.time).getDate() }}日{{ new Date(item.time).getHours() < 10 ? '0' + new Date(item.time).getHours() : new Date(item.time).getHours() }}:{{ new Date(item.time).getMinutes() < 10 ? '0' + new
                                Date(item.time).getMinutes() : new Date(item.time).getMinutes() }}</span>
                </footer>
                <van-divider :style="{ borderColor: '#ccc' }" />
            </li>
        </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const historyList = ref(JSON.parse(localStorage.getItem("record")!))

const showPopup = ref(false)
const changeShowPopup = function () {
    if (historyList.value != null) {
        showPopup.value = !showPopup.value
    }
}
const deleteRecord = function () {
    localStorage.removeItem('record')
    historyList.value = JSON.parse(localStorage.getItem("record")!)
    showPopup.value = !showPopup.value
}

function entry(id: string) {
    if (id.split('_')[0] == 'audio') {
        router.push({ path: '/listenBook', query: { queryId: id } })
    } else {
        router.push({ path: '/bookMsg', query: { queryId: id } })
    }
}
</script>

<style lang="scss" scoped>
.history-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50rem;
    padding: 0 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background-color: $backColor;
    z-index: 999;

    h3 {
        font-size: 16rem;
    }

    &::after{
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100vw;
        height: 1rem;
        background-color: $shadowColor;
    }
}

.delete-record {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16rem;
    background-color: rgba(0, 0, 0, .3);
    z-index: 9999;

    .delete-remind {
        width: 300rem;
        height: 125rem;
        border-radius: 10rem;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        background-color: $backColor;

        p {
            width: 100%;
            padding: 15rem 30rem;
        }

        .button-box {
            width: 300rem;
            height: 45rem;
            margin-top: auto;
            display: flex;
            justify-content: space-between;

            .button {
                width: 149rem;
                flex-shrink: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #ecedea;
                box-shadow: 0 -.1rem 2rem 0 $shadowColor;
            }
        }
    }
}

.history-box {
    padding: 65rem 15rem 0;

    li {
        position: relative;

        h3 {
            font-size: 16rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .msg-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &:last-child {
            padding-bottom: 15rem;

            :deep(.van-divider) {
                display: none;
            }
        }
    }
}</style>