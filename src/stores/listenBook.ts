import { defineStore } from "pinia"
import { ref } from "vue"

import { getListenBookMsg, getListenBookList, getListen } from "../api/index";

export const useListenBookStore = defineStore('listenBook', () => {
    const listenBookMsg = ref()
    async function updateListenBookMsg(id: string) {
        listenBookMsg.value = null
        const res = await getListenBookMsg(id);
        listenBookMsg.value = res.data.data.sources[0];
    }

    const listenBookList = ref()
    async function updateListenBookList(id: string) {
        listenBookList.value = null
        const res = await getListenBookList(id);
        listenBookList.value = res.data.data.catalogs;
    }

    const listen = ref()
    async function updateListen() {
        listen.value = null
        const res = await getListen();
        listen.value = res.data.data.urls;
    }

    return { listenBookMsg, updateListenBookMsg, listenBookList, updateListenBookList, listen, updateListen }
})