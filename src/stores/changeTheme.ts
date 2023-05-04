import { defineStore } from "pinia"
import { ref } from "vue"


export const useThemeStore = defineStore('theme', () => {
    const isDarkThem = ref(JSON.parse(localStorage.getItem('isDarkThem')!)?true:false);
    const changeThem = () => {
        if (isDarkThem.value) {
            document.getElementsByTagName('body')[0].style.setProperty('--back-color', '#2f2f2f');
            document.getElementsByTagName('body')[0].style.setProperty('--font-color-index', '#fff');
            document.getElementsByTagName('body')[0].style.setProperty('--font-color-second', '#ccc');
            document.getElementsByTagName('body')[0].style.setProperty('--else-font-color', '#aaa');
            document.getElementsByTagName('body')[0].style.setProperty('--box-color', '#363434');
            document.getElementsByTagName('body')[0].style.setProperty('--shadow-color', '#111');
            document.getElementsByTagName('body')[0].style.setProperty('--van-popover-light-background', '#363434');
            document.getElementsByTagName('body')[0].style.setProperty('--van-popup-background', '#363434');
        } else {
            document.getElementsByTagName('body')[0].style.setProperty('--back-color', '#fff');
            document.getElementsByTagName('body')[0].style.setProperty('--font-color-index', '#000');
            document.getElementsByTagName('body')[0].style.setProperty('--font-color-second', '#333');
            document.getElementsByTagName('body')[0].style.setProperty('--else-font-color', '#666');
            document.getElementsByTagName('body')[0].style.setProperty('--box-color', '#f5f5f5');
            document.getElementsByTagName('body')[0].style.setProperty('--shadow-color', '#ddd');
            document.getElementsByTagName('body')[0].style.setProperty('--van-popover-light-background', '#fff');
            document.getElementsByTagName('body')[0].style.setProperty('--van-popup-background', '#fff');
        }
        localStorage.setItem('isDarkThem',JSON.stringify(isDarkThem.value))
    }
    changeThem() 

    return { isDarkThem, changeThem }
})