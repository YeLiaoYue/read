import { defineStore } from "pinia"
import { ref } from "vue"

import { getHotWords, getSearchHint, getSearchRecord } from "../api/index";

export const useSearchStore = defineStore('search', () => {
    const hotWords = ref()
    async function updateHotWords() {
        const res = await getHotWords();
        hotWords.value = res.data.list;
    }

    const searchHint = ref()
    async function updateSearchHint(val: string) {
        searchHint.value = null
        const res = await getSearchHint(val);
        searchHint.value = res.data.words.w;
    }
    const searchRecord = ref()
    async function updateSearchRecord(val: string, page: number, sort?: number, channel?: number, bookStatus?: number, pay?: number, wordCount?: number) {
        searchRecord.value = null
        const res = await getSearchRecord(val, page, sort, channel, bookStatus, pay, wordCount);
        searchRecord.value = res.data.data.books;
    }

    return { hotWords, updateHotWords, searchHint, updateSearchHint, searchRecord, updateSearchRecord }
})