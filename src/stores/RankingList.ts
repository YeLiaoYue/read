import { defineStore } from "pinia"
import { ref } from "vue"

import { getRank, getRankList } from "../api/index";

export const useRankStore = defineStore('rank', () => {
    const rank = ref()
    async function updateRank() {
        const res = await getRank();
        rank.value = res.data.data.list;
    }

    const rankList = ref()
    async function updateRankList(url: string) {
        const res = await getRankList(url);
        rankList.value = res.data.list;
    }

    const publishRankList = ref()
    async function updatePublishRankList(url: string) {
        const res = await getRankList(url);
        publishRankList.value = res.data.data;
    }

    return { rank, updateRank, rankList, updateRankList,publishRankList,updatePublishRankList }
})