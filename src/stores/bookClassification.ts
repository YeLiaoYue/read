import { defineStore } from "pinia"
import { ref } from "vue"

import { getType,getTypeItem,getTypeItemScreen,getTypeItemRecord } from "../api/index";


export const useBookTypeStore = defineStore('bookType', () => {
  const bookType = ref()
  async function updateType() {
    const res = await getType();
    bookType.value = res.data.books;
  }

  const bookTypeItem = ref()
  async function updateTypeItem(url:string) {
    const res = await getTypeItem(url);
    bookTypeItem.value = res.data.list[0].labels;
  }

  const bookTypeItemScreen = ref()
  async function updateTypeItemScreen(url:string) {
    const res = await getTypeItem(url);
    bookTypeItemScreen.value = res.data.categories;
  }

  const bookTypeItemRecord = ref()
  async function updateTypeItemRecord(catId:string|number,wordCount:number,pay:number,bookStatus:number,sort:number) {
    const res = await getTypeItemRecord(catId,wordCount,pay,bookStatus,sort);
    bookTypeItemRecord.value = res.data.list;
  }

  return { bookType,updateType,bookTypeItem,updateTypeItem,bookTypeItemScreen,updateTypeItemScreen,bookTypeItemRecord,updateTypeItemRecord }
})