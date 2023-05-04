<template>
    <van-sticky>
        <header class="book-town-header">
            <transition>
                <section class="book-town-search" v-if="showSearch">
                    <div class="sex" v-if="gender == '1'" @click="changeGender('2')"><span class="iconfont boy">&#xe6e3;</span></div>
                    <div class="sex" v-if="gender == '2'" @click="changeGender('1')"><span class="iconfont girl">&#xe644;</span></div>
                    <div class="search-box" @click="$router.push('/search')">唐诗里的烟火人间<i><van-icon name="search" size="16rem" /></i></div>
                </section>
            </transition>
            <nav class="book-town-nav">
                <RouterLink :to="'/' + headerNav[index]" v-for="(item, index) in bookNav" :key="item.id">{{ item.name }}</RouterLink>
            </nav>
        </header>
    </van-sticky>
    <RouterView v-slot="{ Component }">
        <KeepAlive>
            <component :is="Component" @touchend="(event: TouchEvent) => touchend(event)" @touchstart="(event: TouchEvent) => touchstart(event)" />
        </KeepAlive>
    </RouterView>
    <!-- <RouterView  /> -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBookTownStore } from "@/stores/bookCity";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()

const showSearch = ref(true)

const store = useBookTownStore()

const { bookNav } = storeToRefs(store);
const { updateNav, updateChoiceness, updateFree, updateMan, updateGirl, updatePublish, updateListen } = store;

const headerNav = ref(["", "free", "man", "girl", "publish", "listen"])
const gender = ref<string>("1")
gender.value = localStorage.getItem("gender") || "1"

async function getVal() {
    await updateNav(parseInt(gender.value))
    updateChoiceness(bookNav.value[0].url)
    updateFree(bookNav.value[1].url)
    updateMan(bookNav.value[2].url)
    updateGirl(bookNav.value[3].url)
    updatePublish(bookNav.value[4].url)
    updateListen(bookNav.value[5].url)
}
getVal()

const changeGender = (num: string) => {
    gender.value = num
    localStorage.setItem("gender", num)
    getVal()
}

const startX = ref<number>(0)
const startY = ref<number>(0)
function touchstart(event: TouchEvent) {

    // event.preventDefault()

    startX.value = event.changedTouches[0].pageX
    startY.value = event.changedTouches[0].pageY
}


function touchend(event: TouchEvent) {
    // event.preventDefault()
    var moveEndX = event.changedTouches[0].pageX
    var moveEndY = event.changedTouches[0].pageY
    var X = moveEndX - startX.value
    var Y = moveEndY - startY.value

    var index = headerNav.value.indexOf(router.currentRoute.value.path.slice(1))

    if (Math.abs(X) > Math.abs(Y) && X > 50) {
        if (index > 0) {
            router.push(`/${headerNav.value[index - 1]}`)
        }
    } else if (Math.abs(X) > Math.abs(Y) && X < -50) {
        if (index < headerNav.value.length - 1) {
            router.push(`/${headerNav.value[index + 1]}`)
        }
    } else if (Math.abs(Y) > Math.abs(X) && Y > 50) {
        showSearch.value = true
    } else if (Math.abs(Y) > Math.abs(X) && Y < -50) {
        showSearch.value = false
    }
}
</script>

<style lang="scss" scoped>
.book-town-header {
    background-color: $backColor;
    box-shadow: 0 0 2rem 0 $shadowColor;

    .book-town-search {
        height: 50rem;
        padding: 0 20rem;
        display: flex;
        align-items: center;

        .sex {
            width: 30rem;
            height: 30rem;
            margin-right: 15rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: $boxColor;
            box-shadow: 0 0 5rem 0 $shadowColor;

            .boy {
                color: #1e88f3;
            }

            .girl {
                color: #f67061;
            }
        }

        .search-box {
            width: 290rem;
            height: 30rem;
            padding: 0 15rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 15rem;
            background-color: $boxColor;
            color: $elseFontColor;
            box-shadow: 0 5rem 10rem 0 $shadowColor;
        }
    }

    .book-town-nav {
        width: 100vw;
        height: 40rem;
        padding-top: 5rem;
        display: flex;
        justify-content: space-around;
        align-items: start;

        a {
            font-size: 14rem;
            font-weight: normal;
        }

        .router-link-exact-active {
            position: relative;
            font-size: 14rem;
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
</style>