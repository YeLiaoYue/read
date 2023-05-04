<template>
  <div>
    <header class="bookrack-header">
      <div class="title">书架</div>
      <div class="icon">
        <van-icon name="search" size="20rem" @click="$router.push('/search')" />
        <van-icon name="clock-o" size="20rem" @click="$router.push('/history')" />
        <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect" :offset="[12, 8]" placement="bottom-end">
          <template #reference>
            <span class="iconfont">&#xe6ab;</span>
          </template>
        </van-popover>
      </div>
    </header>
    <van-divider :style="{ borderColor: '$shadowColor' }" />
    <ul class="list-box" v-if="model">
      <li v-for="item in bookrackList" @click="enterMsg(item.type, item.id, item.title)">
        <van-image width="95rem" height="133rem" :src="item.cover + '?imageView&thumbnail=270y390'" />
        <h3>{{ item.title }}</h3>
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
      </li>
    </ul>
    <ul class="list-model" v-else>
      <li v-for="item in bookrackList" @click="enterMsg(item.type, item.id, item.title)">
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
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const bookrackList = ref(JSON.parse(localStorage.getItem("bookrack")!))

function enterMsg(type: number, id: string, title: string) {
  if (type == 1) {
    router.push({ path: '/listenBook', query: { queryId: id } })
  } else {
    router.push({ path: '/bookMsg', query: { queryId: id } })
  }
}

const model = ref(localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model')!) : true)
function changeModel() {
  model.value = !model.value
  localStorage.setItem('model', JSON.stringify(model.value))
  setActions()
}

const showPopover = ref(false);

const actions = ref();
function setActions() {
  if (model.value) {
    actions.value = [
      { text: '批量管理' },
      { text: '列表模式' }
    ]
  } else {
    actions.value = [
      { text: '批量管理' },
      { text: '书封模式' }
    ]
  }
}
setActions()
const onSelect = (action: { text: string }) => {
  if (action.text == '批量管理') {
    router.push('/changeBookrack')
  } else {
    changeModel()
  }
}

</script>

<style lang="scss" scoped>
.bookrack-header {
  padding: 15rem 20rem 0;
  display: flex;
  justify-content: space-between;
  font-size: 16rem;
  font-weight: bold;

  :deep(.icon) {
    width: 100rem;
    display: flex;
    justify-content: space-between;

    .van-popover {
      background-color: #fff !important;
    }
  }
}

.list-box {
  padding: 0 20rem;
  display: flex;
  flex-wrap: wrap;

  li {
    width: 95rem;
    margin: 0 25rem 10rem 0;

    &:nth-child(3n) {
      margin-right: 0;
    }

    h3 {
      margin: 5rem 0 10rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    .chapter {
      color: $elseFontColor;
    }
  }
}

.list-model {
  padding: 0 20rem;

  li {
    display: flex;
    margin-bottom: 20rem;

    :deep(.van-image) {
      box-shadow: 3rem 3rem 3rem 0 $shadowColor;
    }

    .msg-box {
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
}</style>