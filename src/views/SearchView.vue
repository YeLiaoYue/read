<template>
    <div class="search-view">
        <form action="/">
            <van-search v-model="value" show-action placeholder="唐诗里的烟火人间" shape="round" @search="searchValue(value, null)" @cancel="$router.go(-1)" />
        </form>
        <div class="search-content" v-if="show == 0">
            <section class="search-hot" v-if="hotWords">
                <h3>热门搜索</h3>
                <ul>
                    <li v-for="item, index in hotWords" @click="searchValue(item.name, item.id)"><span>{{ index + 1 }}</span>{{ item.name }}</li>
                </ul>
            </section>
            <section class="search-history">
                <header>
                    <h3>最近搜索</h3>
                    <van-icon name="delete-o" size="20rem" @click="changeShowPopup" />
                </header>
                <ul class="history-item">
                    <li v-for="item in search" @click="searchValue(item.value, item.id)"><span v-if="item.id"><van-icon name="bookmark-o" size="16rem" /></span><span v-else><van-icon name="search" size="16rem" /></span>{{ item.value }}</li>
                </ul>
                <div class="delete-search" v-if="showPopup" @click="changeShowPopup">
                    <section class="delete-remind">
                        <p>是否清空最近搜索?</p>
                        <div class="button-box">
                            <div class="button cancel" @click.stop="changeShowPopup">取消</div>
                            <div class="button delete" @click="deleteSearch">删除</div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
        <ul class="hint-box" v-else-if="show == 1">
            <li @click="searchValue(value, null)">搜索“{{ value }}”</li>
            <li v-for="item in searchHint" @click="searchValue(item.text, item.id)">{{ item.text }}</li>
        </ul>
        <section class="record-box" v-else>
            <van-dropdown-menu active-color="#ee726f">
                <van-dropdown-item v-model="sort" :options="option1" />
                <van-dropdown-item v-model="channel" :options="option2" />
                <van-dropdown-item title="筛选" ref="item">
                    <h3>完结状态</h3>
                    <van-button type="default" :class="bookStatus == 0 ? 'active' : ''" @click="changeBookStatus(0)">全部</van-button>
                    <van-button type="default" :class="bookStatus == 1 ? 'active' : ''" @click="changeBookStatus(1)">完结</van-button>
                    <van-button type="default" :class="bookStatus == 2 ? 'active' : ''" @click="changeBookStatus(2)">连载</van-button>
                    <h3>书籍价格</h3>
                    <van-button type="default" :class="pay == 0 ? 'active' : ''" @click="changePay(0)">全部</van-button>
                    <van-button type="default" :class="pay == 1 ? 'active' : ''" @click="changePay(1)">免费</van-button>
                    <van-button type="default" :class="pay == 2 ? 'active' : ''" @click="changePay(2)">包月</van-button>
                    <van-button type="default" :class="pay == 3 ? 'active' : ''" @click="changePay(3)">收费</van-button>
                    <h3>书籍字数</h3>
                    <van-button type="default" :class="wordCount == null ? 'active' : ''" @click="changeWordCount(null)">全部</van-button>
                    <van-button type="default" :class="wordCount == 0 ? 'active' : ''" @click="changeWordCount(0)">30万字以下</van-button>
                    <van-button type="default" :class="wordCount == 1 ? 'active' : ''" @click="changeWordCount(1)">30-50万字</van-button>
                    <van-button type="default" :class="wordCount == 2 ? 'active' : ''" @click="changeWordCount(2)">50-100万字</van-button>
                    <van-button type="default" :class="wordCount == 3 ? 'active' : ''" @click="changeWordCount(3)">100万字以上</van-button>
                </van-dropdown-item>
            </van-dropdown-menu>
            <h2>书城</h2>
            <div class="message-loading" v-if="messageLoading">
                <van-loading type="spinner" />
            </div>
            <van-list v-else v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <section class="record-list" v-for="item in list" @click="searchValue(item.title, item.bookId)">
                    <van-image width="80rem" height="112rem" :src="item.cover + '?imageView&thumbnail=240y336'" />
                    <div class="book-msg">
                        <h5>{{ item.title }}</h5>
                        <div>{{ item.author }}<span v-if="item.category"> / {{ item.category }}</span></div>
                        <p>{{ item.summary }}</p>
                    </div>
                </section>
            </van-list>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from 'pinia';
import type { DropdownItemInstance } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useSearchStore()

const { hotWords, searchHint, searchRecord } = storeToRefs(store);
const { updateHotWords, updateSearchHint, updateSearchRecord } = store;

//搜索
const value = ref('')
const page = ref(1)
const sort = ref(0)
watch(sort, async () => {
    page.value = 0
    list.value = []
    messageLoading.value = true
    await onLoad(value.value)
})

const channel = ref(0)
watch(channel, async () => {
    page.value = 0
    list.value = []
    messageLoading.value = true
    await onLoad(value.value)
})

const bookStatus = ref(0)
const changeBookStatus = async function (num: number) {
    bookStatus.value = num
    page.value = 0
    list.value = []
    item.value?.toggle()
    messageLoading.value = true
    await onLoad(value.value)
}

const pay = ref(0)
const changePay = async function (num: number) {
    pay.value = num
    page.value = 0
    list.value = []
    item.value?.toggle()
    messageLoading.value = true
    await onLoad(value.value)
}

const wordCount = ref<number | null>(null)
const changeWordCount = async function (num: number | null) {
    wordCount.value = num
    page.value = 0
    list.value = []
    item.value?.toggle()
    messageLoading.value = true
    await onLoad(value.value)
}

const item = ref<DropdownItemInstance>()
const messageLoading = ref(false)
const onSearch = async (val: string) => {
    if (val != '') {
        show.value = 2
        if (wordCount.value == null) {
            await updateSearchRecord(val, page.value, sort.value, channel.value, bookStatus.value, pay.value)
        } else {
            await updateSearchRecord(val, page.value, sort.value, channel.value, bookStatus.value, pay.value, wordCount.value)
        }
    }
}

//list
const list = ref();
const loading = ref(false);
const finished = ref(false);
const getHint = ref(true)
const onLoad = async (val: string, id?: string | null) => {
    if (val) {
        if (id == null) {
            getHint.value = false
            value.value = val
            await onSearch(val)
            getHint.value = true
            localStorage.setItem('search', JSON.stringify([{ "value": val, 'id': id || null }, ...JSON.parse(<string>localStorage.getItem('search'))?.filter((item: { value: string; }) => item.value != val) || []]))
        } else {
            localStorage.setItem('search', JSON.stringify([{ "value": val, 'id': id || null }, ...JSON.parse(<string>localStorage.getItem('search'))?.filter((item: { value: string; }) => item.value != val) || []]))
            router.push({ path: '/particulars', query: { queryId: id,title:val } })
        }
    }
    search.value = JSON.parse(<string>localStorage.getItem('search'))
    messageLoading.value = false
    searchRecord.value?.map((item: {}) => list.value.push(item))
    page.value++

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
        finished.value = true;
    }
};

//获得热门搜索
updateHotWords()

//获取搜索建议
const show = ref(0)
watch(value, async (val) => {
    if (getHint.value) {
        if (val != '') {
            show.value = 1
            await updateSearchHint(val)
        } else {
            show.value = 0
        }
    }
})

//点击搜索
const searchValue = async function (val: string, id: string | null) {
    page.value = 1
    list.value = []
    await onLoad(val, id)
}

//搜索结果
const option1 = [
    { text: '综合排序', value: 0 },
    { text: '销量最高', value: 1 },
    { text: '人气最旺', value: 2 },
    { text: '最新上架', value: 3 },
    { text: '最近更新', value: 4 },
];
const option2 = [
    { text: '全部频道', value: 0 },
    { text: '男生', value: 1 },
    { text: '女生', value: 2 },
    { text: '出版', value: 3 },
];

//最近搜索
const search = ref(JSON.parse(<string>localStorage.getItem('search')))

//清除搜索记录
const showPopup = ref(false)
const changeShowPopup = function () {
    if (search.value) {
        showPopup.value = !showPopup.value
    }
}
const deleteSearch = function () {
    localStorage.removeItem('search')
    search.value = []
}
</script>

<style lang="scss" scoped>
.search-view {
    width: 100vw;
    height: 100vh;
    background-color: $backColor;
    :deep(.van-cell){
        padding: 0 10rem;
        border-radius: 17rem;
        overflow: hidden;
    }

    :deep(.van-search__field){
        background-color: $boxColor;
    }
}

.van-search {
    background-color: $backColor;
}

.search-hot {
    padding: 20rem;

    h3 {
        margin: 10rem 0;
        font-size: 16rem;
        color: $elseFontColor;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        li {
            width: 40vw;
            margin: 10rem 0;
            display: flex;
            font-size: 14rem;

            span {
                width: 18rem;
                height: 18rem;
                margin-right: 10rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                color: $backColor;
            }


            &:first-child>span {
                background-color: #e64d2e;
            }

            &:nth-child(2)>span {
                background-color: #ff7919;
            }

            &:nth-child(3)>span {
                background-color: #ffbf00;
            }

            &:nth-child(4)>span {
                background-color: #999;
            }

        }
    }
}

.search-history {
    header {
        padding: 20rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $elseFontColor;

        h3 {
            font-size: 16rem;
        }
    }

    .history-item {
        padding: 0 20rem;
        display: flex;
        flex-wrap: wrap;

        li {
            margin: 0 15rem 15rem 0;
            padding: 5rem 10rem;
            font-size: 14rem;
            border-radius: 15rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $boxColor;

            span {
                margin-right: 5rem;
            }
        }
    }

    .delete-search {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16rem;
        background-color: $backColor;

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
}

.hint-box {
    li {
        margin-left: 20rem;
        height: 50rem;
        display: flex;
        align-items: center;
        font-size: 16rem;
        box-shadow: 0 1rem 0 0 $shadowColor;
    }
}

h2 {
    padding: 10rem;
    font-size: 14rem;
    color: $elseFontColor;
}

.message-loading {
    display: flex;
    justify-content: center;
    align-items: center;
}

.van-dropdown-item {
    &:last-child {
        :deep(.van-popup) {
            padding: 15rem 30rem;
            box-sizing: border-box;
            background-color: #f5f5f5;

            h3 {
                margin-bottom: 15rem;
                color: $elseFontColor;
            }

            .van-button {
                margin: 0 15rem 15rem 0;
                color: $elseFontColor;
            }

            .active {
                color: $backColor;
                background-color: #ed6460;
            }
        }
    }
}

.record-list {
    width: 100vw;
    padding: 10rem 20rem;
    display: flex;
    background-color: $backColor;

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
            margin: 10rem 0 25rem;
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
</style>