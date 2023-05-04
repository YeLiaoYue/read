<template>
    <van-pull-refresh v-model="refresh" pulling-text="下拉加载上一章" loosing-text="释放即可加载上一章" @refresh="onRefresh" @touchend="(event: TouchEvent) => touchend(event)" @touchstart="(event: TouchEvent) => touchstart(event)">
        <div class="loading" v-if="loadingContent"><van-loading /></div>
        <div class="bookMsg-view" v-else>
            <div class="book-content" v-html="bookContent?.content"></div>
        </div>
        <footer class="content-footer" v-if="loading && loadingContent == false">
            上拉阅读下一章
        </footer>
        <footer class="content-footer" v-else-if="loading == false && loadingContent == false">
            <van-loading type="spinner" size="20rem" />加载中
        </footer>
        <section class="mask mask-top" @click="prevPage"></section>
        <section class="mask mask-middle" @click="changeShowPopup"></section>
        <section class="mask mask-bottom" @click="nextPage"></section>
    </van-pull-refresh>
    <header class="popup-header" v-if="showPopup">
        <van-icon name="arrow-left" size="24rem" @click="$router.go(-1)" />
        <van-icon name="chat-o" size="24rem" @click="pushComment" />
        <div class="addToBookrack" v-if="showAdd" @click="addToBookrack"><van-icon name="plus" /> 加入书架</div>
    </header>
    <footer class="popup-footer" v-if="showPopup">
        <div class="title">{{ title }}</div>
        <div class="icon-box">
            <van-icon name="arrow-left" size="16rem" @click="prevChapter" />
            <van-slider v-model="chapter" @change="onChange" :max="bookList.length" active-color="#ff4b4a" />
            <van-icon name="arrow" size="16rem" @click="nextChapter" />
        </div>
        <ul class="set-box">
            <li @click="changeShowSidebar"><span class="iconfont">&#xe622;</span>目录</li>
            <li @click="changeShowBottom"><span class="iconfont">&#xe636;</span>设置</li>
            <li @click="changeIsDarkThem" v-if="isDarkThem"><span class="iconfont">&#xe64c;</span>日间</li>
            <li @click="changeIsDarkThem" v-else><span class="iconfont">&#xe621;</span>夜间</li>
            <li><van-icon name="ellipsis" size="24rem" />更多</li>
        </ul>
    </footer>
    <section class="sidebar" v-show="showSidebar" @click="changeShowSidebar">
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
            <ul @click.stop>
                <li v-for="item in bookList" class="iconfont" :class="[item.grade == 1 && item.leaf == false ? 'title' : '', item.uuid == current ? 'current' : '', (item.grade != 1 ? true : item.leaf == true) && item.needPay ? 'need-pay' : '']" @click="changeChapter(item.grade, item.leaf, item.uuid)">{{
                    item.title }}
                </li>
            </ul>
        </div>
    </section>
    <section class="set-box">
        <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '100rem' }">
            <div class="theme">
                <h3>主题</h3>
                <div class="button first" :class="[readTheme == 1 ? 'current' : '']" @click="changeReadTheme(1)"></div>
                <div class="button second" :class="[readTheme == 2 ? 'current' : '']" @click="changeReadTheme(2)"></div>
                <div class="button third" :class="[readTheme == 3 ? 'current' : '']" @click="changeReadTheme(3)"></div>
                <div class="button fourth" :class="[readTheme == 4 ? 'current' : '']" @click="changeReadTheme(4)"></div>
            </div>
            <div class="font-size">
                <h3>字号</h3>
                <van-slider v-model="size" @change="changeSize" min="0" max="5" active-color="#e0e0e0" />
            </div>
        </van-popup>
    </section>
</template>

<script setup lang="ts">
import { useBookContentStore } from "@/stores/bookMsg";
import { useThemeStore } from "@/stores/changeTheme";
import { storeToRefs } from "pinia";
import { ref, onUpdated, watch, onBeforeUnmount } from "vue";
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import $ from 'jquery'
import { useRouter } from 'vue-router';

const themStore = useThemeStore()
const { isDarkThem } = storeToRefs(themStore);
const { changeThem } = themStore;

const router = useRouter()

const route = useRoute()
const store = useBookContentStore()

const { bookList, bookContent, bookMsg } = storeToRefs(store);
const { updateBookList, updateContent, updateMsg } = store;

//当前章
const chapter = ref(JSON.parse(localStorage.getItem('record')!)?.filter((item: { id: string; }) => item.id == <string>route.query.queryId)?.[0]?.chapter || 0)

watch(chapter, () => {
    if (JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id == <string>route.query.queryId)) {
        setItem()
    }
})
//加载书籍详情
const getBookMsg = async () => {
    await updateMsg(<string>route.query.queryId)
}
getBookMsg()

//加载章节列表
const getBookList = async () => {
    await updateBookList(<string>route.query.queryId)
    getBookContent()
}
getBookList()

//加载章节内容
const loadingContent = ref(true)
const current = ref('')
const title = ref('')
const getBookContent = async () => {
    await updateContent(<string>route.query.queryId, bookList.value.filter((item: { grade: number, leaf: boolean }) => item.grade != 1 ? true : item.leaf == true)?.[chapter.value]?.uuid)
    current.value = bookList.value.filter((item: { grade: number, leaf: boolean }) => item.grade != 1 ? true : item.leaf == true)?.[chapter.value]?.uuid
    title.value = bookList.value.filter((item: { grade: number, leaf: boolean }) => item.grade != 1 ? true : item.leaf == true)?.[chapter.value]?.title
    window.scrollTo(0, 0);
    loadingContent.value = false
    localStorage.setItem("record", JSON.stringify([{ id: <string>route.query.queryId, 'chapter': chapter.value, time: Date.now(), author: bookMsg.value?.author, title: bookMsg.value?.title }, ...JSON.parse(localStorage.getItem('record')!)?.filter((item: { id: string; }) => item.id != <string>route.query.queryId) || []]))
    if (JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id == <string>route.query.queryId)?.length > 0) {
        setItem()
    }
}

//下拉加载上一章
const refresh = ref(false);
const onRefresh = async () => {
    if (chapter.value == 0) {
        showToast('已经是第一页')
        refresh.value = false;
    } else {
        chapter.value--
        await getBookContent()
        refresh.value = false;
    }
};

//上拉加载下一章
const startX = ref<number>(0)
const startY = ref<number>(0)
function touchstart(event: TouchEvent) {
    startX.value = event.changedTouches[0].pageX
    startY.value = event.changedTouches[0].pageY
}
const loading = ref(true);
async function touchend(event: TouchEvent) {
    var moveEndX = event.changedTouches[0].pageX
    var moveEndY = event.changedTouches[0].pageY
    var X = moveEndX - startX.value
    var Y = moveEndY - startY.value

    if (Math.abs(Y) > Math.abs(X) && Y < -80) {
        loading.value = false
        chapter.value++
        await getBookContent()
        loading.value = true
    }
}

//上一页
function prevPage() {
    let top = document.documentElement || document.body;
    if (top.scrollTop == 0) {
        showToast('已经是第一页')
    } else if (top.scrollTop < 667) {
        top.scrollTop = 0
    } else {
        top.scrollTop = top.scrollTop - 607
    }
}

//下一页
function nextPage() {
    let top = document.documentElement || document.body;
    top.scrollTop = top.scrollTop + 607
}

//显示上下的设置栏
const showPopup = ref(false)
const changeShowPopup = function () {
    showPopup.value = !showPopup.value
}
const onChange = function () {
    loadingContent.value = true
    getBookContent()
}

//显示目录
const showSidebar = ref(false)
const currentScroll = ref(0)
function changeShowSidebar() {
    let top = document.documentElement || document.body;
    if (showSidebar.value) {
        showSidebar.value = !showSidebar.value
        document.body.style.position = 'static';
        document.body.style.height = 'auto';
        $('.bookMsg-view').css("top", 0)
        window.scrollTo(0, currentScroll.value);
    } else {
        showSidebar.value = !showSidebar.value
        currentScroll.value = top.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        $('.bookMsg-view').css("top", -currentScroll.value)
    }
}
onUpdated(() => {
    if (showSidebar.value) {
        $('.content')[0].scrollTop = $('li.current')[0].offsetTop
    }
})

//上一章
const prevChapter = function () {
    if (chapter.value != 0) {
        loadingContent.value = true
        chapter.value--
        getBookContent()
    } else {
        showToast('已经是第一章')
    }
}

//下一章
const nextChapter = function () {
    if (chapter.value != bookList.value.length) {
        loadingContent.value = true
        chapter.value++
        getBookContent()
    } else {
        showToast('已经是最后一章')
    }
}

//点击目录切换当前章节
function changeChapter(grade: number, leaf: boolean, id: string) {
    if (grade == 1 ? leaf == false : true) {
        bookList.value.filter((item: { grade: number, leaf: boolean }) => item.grade != 1 ? true : item.leaf == true).map((item: { uuid: string | string[]; }, index: number) => {
            if (item.uuid.indexOf(id) == 0) {
                chapter.value = index;
            }
        })
        loadingContent.value = true
        getBookContent()
        showSidebar.value = false
    }
}

//跳转到评论页面
function pushComment() {
    router.push({ path: '/comment', query: { queryId: <string>route.query.queryId } })
}

//添加到书架
function setItem() {
    function getType() {
        if ((<string>route.query.queryId).split('_')[0] == 'bd' || (<string>route.query.queryId).split('_')[0] == 'ts') {
            return 0
        } else if ((<string>route.query.queryId).split('_')[0] == 'audio') {
            return 1
        } else {
            return 2
        }
    }
    let type = getType()
    localStorage.setItem('bookrack', JSON.stringify([{ id: <string>route.query.queryId, title: bookMsg.value?.title, cover: bookMsg.value?.cover, length: bookList.value?.length, chapter: chapter.value == null ? null : chapter.value + 1, type, author: bookMsg.value?.author }, ...JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id != <string>route.query.queryId) || []]))
}

const addToBookrack = () => {
    setItem()
    showAdd.value = false
}

//是否显示加入书架
const showAdd = ref(JSON.parse(localStorage.getItem('bookrack')!)?.filter((item: { id: string; }) => item.id == <string>route.query.queryId).length > 0 ? false : true)

//切换日/夜间模式    
function changeIsDarkThem() {
    isDarkThem.value = !isDarkThem.value
    changeThem()
}

//显示设置
const showBottom = ref(false)
function changeShowBottom() {
    showPopup.value = false
    showBottom.value = true
}

//切换阅读页面颜色
const readTheme = ref(JSON.parse(localStorage.getItem('readTheme')!) || 1)
function isReadTheme() {
    switch (readTheme.value) {
        case 1:
            $(".bookMsg-view").css('backgroundColor', "#f7f7f7")
            $(".book-content").css('backgroundColor', "#f7f7f7")
            $(".book-content").css('color', "#000")
            break;
        case 2:
            $(".bookMsg-view").css('backgroundColor', "#f5f0e6")
            $(".book-content").css('backgroundColor', "#f5f0e6")
            $(".book-content").css('color', "#000")
            break;
        case 3:
            $(".bookMsg-view").css('backgroundColor', "#e1f0e6")
            $(".book-content").css('backgroundColor', "#e1f0e6")
            $(".book-content").css('color', "#000")
            break;
        case 4:
            $(".bookMsg-view").css('backgroundColor', "#121212")
            $(".book-content").css('backgroundColor', "#121212")
            $(".book-content").css('color', "#fff")
            break;
        default:
            break;
    }
}
function setReadTheme() {
    if (!isDarkThem.value) {
        isReadTheme()
    }
}
watch(isDarkThem, () => {
    if (isDarkThem.value) {
        $(".bookMsg-view").css('backgroundColor', "#212426")
        $(".book-content").css('backgroundColor', "#212426")
        $(".book-content").css('color', "#5e5f60")
    } else {
        isReadTheme()
    }
})

function changeReadTheme(index: number) {
    isDarkThem.value = true
    readTheme.value = index
    localStorage.setItem('readTheme', JSON.stringify(readTheme.value))
    isReadTheme()
}

//修改字号
const size = ref(JSON.parse(localStorage.getItem('size')!) || 2)
function changeSize() {
    localStorage.setItem('size', JSON.stringify(size.value))
    $(".book-content").css('font-size', 14 + size.value * 2 + 'rem')
    $(".book-content h1").css('font-size', 24 + size.value * 2 + 'rem')
    $(".book-content h2").css('font-size', 24 + size.value * 2 + 'rem')
    $(".book-content h3").css('font-size', 24 + size.value * 2 + 'rem')
    $(".book-content p").css('font-size', 14 + size.value * 2 + 'rem')
}
onUpdated(() => {
    setReadTheme(),
        changeSize()
})

//添加阅读记录
onBeforeUnmount(() => {
    if (bookList.value && bookContent.value && bookMsg.value) {
        localStorage.setItem("record", JSON.stringify([{ id: bookMsg.value.bookId, 'chapter': chapter.value, time: Date.now(), author: bookMsg.value?.author, title: bookMsg.value.title }, ...JSON.parse(localStorage.getItem('record')!)?.filter((item: { id: string; }) => item.id != bookMsg.value.bookId) || []]))
    }
})
</script>

<style lang="scss" scoped>
.loading {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bookMsg-view {
    position: relative;

    :deep(.book-content) {
        margin: 0 20rem;
        font-size: 18rem;
        line-height: 32rem;
        background-color: $backColor;


        h1 {
            padding: 100rem 0;
            font-size: 28rem;

            span {
                font-weight: bold;
            }
        }

        h2,
        h3 {
            padding: 30rem 0 10rem;
            font-size: 28rem;
            font-weight: bold;
        }

        p {
            margin: 30rem 0;
            font-size: 18rem;
            text-indent: 2em;
        }
    }
}


.mask {
    position: fixed;
    left: 0;
    width: 100vw;
    height: 250rem;
}

.mask-top {
    top: 0;
}

.mask-middle {
    height: 168rem;
    top: 250rem;
}

.mask-bottom {
    bottom: 0;
}

.content-footer {
    width: 100vw;
    height: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16rem;
    color: $elseFontColor;
}

.popup-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50rem;
    padding: 0 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $backColor;
    box-shadow: 0 .5rem 0 0 $shadowColor;
    box-sizing: border-box;

    .addToBookrack {
        position: absolute;
        top: 60rem;
        right: 0;
        width: 80rem;
        height: 27rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14rem;
        color: $shadowColor;
        background-color: #c9483c;
    }
}

.popup-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 150rem;
    padding-top: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 -.5rem 0 0 $shadowColor;
    background-color: $backColor;

    .icon-box {
        width: 100vw;
        margin: 20rem 0;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .van-slider {
            width: 250rem;
        }
    }

    .set-box {
        width: 100vw;
        display: flex;
        justify-content: space-around;

        li {
            display: flex;
            flex-direction: column;

            .iconfont {
                margin-bottom: 5rem;
                font-size: 24rem;
            }

            :deep(.van-icon) {
                margin-bottom: 5rem;
            }
        }
    }
}

.sidebar {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);

    .content-header {
        width: 90vw;
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
        width: 90vw;
        padding: 0 20rem 20rem;
        font-size: 14rem;
        font-weight: bold;
        background-color: $backColor;
    }

    .content {
        position: relative;
        top: -1rem;
        width: 90vw;
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
            background-color: rgba(0, 0, 0, .1);
        }
    }

    ul {
        width: 90vw;
        background-color: $backColor;

        li {
            margin-left: 20rem;
            padding: 15rem 12rem 15rem 20rem;
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
                content: '\e625';
                text-align: end;
            }
        }
    }
}

.set-box {
    :deep(.van-popup) {
        padding: 20rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 16rem;

        .theme {
            display: flex;
            justify-content: space-between;


            .button {
                width: 60rem;
                height: 25rem;
            }

            .first {
                background-color: #f7f7f7;
            }

            .second {
                background-color: #f5f0e6;
            }

            .third {
                background-color: #e1f0e6;
            }

            .fourth {
                background-color: #121212;
            }

            .current {
                box-shadow: 0 0 3rem 0 $elseFontColor;
            }
        }

        .font-size {
            display: flex;
            align-items: center;

            h3 {
                margin-right: 15rem;
            }

            .van-slider {
                flex: 1;
            }
        }
    }
}
</style>