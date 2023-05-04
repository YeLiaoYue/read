<template>
    <header class="mine-header">
        <van-icon name="envelop-o" size="30rem" />
        <div class="login-box">
            <van-image width="80rem" height="80rem" src="https://pic.616pic.com/ys_bnew_img/00/12/71/u3OyCgBP5v.jpg" :round="true" />
            <div class="title">点击登录</div>
        </div>
        <section class="activity">
            <div class="top-up">
                <h3>余额</h3>
                <p>充值送红包</p>
                <div class="button">充值</div>
            </div>
            <div class="silder"></div>
            <div class="sign-in">
                <h3>签到</h3>
                <p>做任务领红包</p>
                <div class="button">签到</div>
            </div>
        </section>
    </header>
    <ul class="set-box">
        <li><van-icon name="orders-o" size="20rem" />笔记<van-icon name="arrow" size="20rem"/></li>
        <li><span class="iconfont">&#xebb3;</span>已购和上传<van-icon name="arrow" size="20rem"/></li>
        <li><span class="iconfont">&#xe614;</span>在线客服<van-icon name="arrow" size="20rem"/></li>
        <li><span class="iconfont">&#xe621;</span>夜间模式<van-switch v-model="isDarkThem" @change="changeThem" active-color="#ee0a24" inactive-color="#dcdee0" size="20rem" /></li>
        <li><span class="iconfont">&#xe65a;</span>积分商城<van-icon name="arrow" size="20rem"/></li>
        <li><span class="iconfont">&#xe605;</span>设置<van-icon name="arrow" size="20rem"/></li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useThemeStore } from "@/stores/changeTheme";
import { storeToRefs } from "pinia";

const store = useThemeStore()
const { isDarkThem } = storeToRefs(store);
const { changeThem } = store;

</script>

<style lang="scss" scoped>
.mine-header {
    padding: 0 20rem 20rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1rem 10rem 0 $shadowColor;

    .van-icon {
        padding: 10rem 0;
        margin-left: auto;
    }

    .login-box {
        display: flex;
        align-items: center;

        .title {
            font-size: 20rem;
            font-weight: bold;
            margin-left: 20rem;
        }
    }

    .activity {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .top-up,
        .sign-in {
            margin-top: 30rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            h3 {
                font-size: 16rem;
                font-weight: bold;
            }

            p {
                margin: 10rem 0 15rem;
                color: $elseFontColor;
            }

            .button {
                padding: 3rem 20rem;
                font-size: 14rem;
                color: #f24949;
                border-radius: 14rem;
                border: 1rem solid #f24949;
            }
        }

        .top-up {
            .button {
                color: $backColor;
                background-color: #f24949;
            }
        }

        .silder {
            width: 1rem;
            height: 50rem;
            background-color: $shadowColor;
        }
    }
}
.set-box {
    width: 100vw;
    margin-top: 20rem;
    padding: 0 20rem 50rem;
    font-size: 14rem;

    li {
        padding: 20rem 0;
        display: flex;
        align-items: center;
        color: $elseFontColor;

        :deep(.van-icon-orders-o) {
            margin-right: 24rem;
        }

        .iconfont {
            margin-right: 20rem;
            font-size: 24rem;
        }

        :deep(.van-icon-arrow),
        :deep(.van-switch) {
            margin-left: auto;
        }
    }
}</style>