import { defineStore } from "pinia"
import { ref } from "vue"

import { getRecommends, getNav } from "../api/index";

export const useBookTownStore = defineStore('bookTown', () => {
  const bookNav = ref()
  async function updateNav(gender: number) {
    const res = await getNav(gender);
    bookNav.value = res.data.data.navi;
  }

  const bookChoiceness = ref()
  async function updateChoiceness(url: string) {
    const res = await getRecommends(url);
    bookChoiceness.value = res.data.data.list;
  }

  const bookFree = ref()
  async function updateFree(url: string) {
    const res = await getRecommends(url);
    bookFree.value = res.data.data.list;
  }

  const bookMan = ref()
  async function updateMan(url: string) {
    const res = await getRecommends(url);
    bookMan.value = res.data.data.list;
  }

  const bookGirl = ref()
  async function updateGirl(url: string) {
    const res = await getRecommends(url);
    bookGirl.value = res.data.data.list;
  }
  
  const bookPublish = ref()
  async function updatePublish(url: string) {
    const res = await getRecommends(url);
    bookPublish.value = res.data.data.list;
  }

  const bookListen = ref()
  async function updateListen(url: string) {
    const res = await getRecommends(url);
    bookListen.value = res.data.data.list;
  }

  return { bookNav, updateNav, bookChoiceness, updateChoiceness, bookFree, updateFree, bookMan, updateMan, bookGirl, updateGirl,bookPublish,updatePublish,bookListen,updateListen }
})