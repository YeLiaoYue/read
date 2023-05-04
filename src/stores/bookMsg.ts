import { defineStore } from "pinia"
import { ref } from "vue"

import { getBookList, getContent, getBookMsg, getSub, getNewChapter, getComments } from "../api/index";


export const useBookContentStore = defineStore('bookContent', () => {
  const bookList = ref()
  async function updateBookList(source: string) {
    bookList.value = null
    const res = await getBookList(source);
    bookList.value = res.data.data.catalog;
  }

  const bookContent = ref()
  async function updateContent(source: string, content: string) {
    bookContent.value = null
    const res = await getContent(source, content);
    bookContent.value = res.data.data;
  }

  const bookMsg = ref()
  async function updateMsg(id: string) {
    bookMsg.value = null
    const res = await getBookMsg(id);
    bookMsg.value = res.data.data.book;
  }

  const bookSub = ref()
  async function updateSub(id: string, val: string) {
    bookSub.value = null
    const res = await getSub(id, val);
    bookSub.value = res.data.feed.entry;
  }

  const bookNewChapter = ref()
  async function updateNewChapter(id: string) {
    bookNewChapter.value = null
    const res = await getNewChapter(id);
    bookNewChapter.value = res.data.item;
  }

  const bookComments = ref()
  async function updateComments(id: string) {
    bookComments.value = null
    const res = await getComments(id);
    bookComments.value = res.data.all.list;
  }

  return { bookList, updateBookList, bookContent, updateContent, bookMsg, updateMsg, bookSub, updateSub, bookNewChapter, updateNewChapter, bookComments, updateComments }
})