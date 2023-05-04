import axios from "./axios";

export const getNav = (gender: number) =>
    axios.get(`/abc/store/navi.json?gender=${gender}`);

export const getRecommends = (url: string) =>
    axios.get("/abc" + url);

//书籍章节列表    
export const getBookList = (source: string) =>
    axios.get("/abc/reader/book/info.json?source_uuid=" + source);

//书籍内容    
export const getContent = (source: string, content: string) =>
    axios.get("/abc/reader/book/content.json?source_uuid=" + source + "&content_uuid=" + content);

//书籍信息
export const getBookMsg = (id: string) =>
    axios.get("/abc/book/info.json?sourceUuid=" + id);

//热门搜索
export const getHotWords = () =>
    axios.get("/abc/search/getHotWords")

//搜索建议
export const getSearchHint = (val: string) =>
    axios.get("/abc/search/searchHint?search=" + val)

//搜索结果
export const getSearchRecord = (keyword: string, page: number = 1, sort: number = 0, channel: number = 0, bookStatus: number = 0, pay: number = 0, wordCount?: number) =>
    axios.get("/abc/search/book.json", { params: { keyword, page, sort, channel, bookStatus, pay, wordCount } })

//书籍详情    
export const getSub = (id: string, val: string) =>
    axios.get("/abc/book/getsub.json?id=" + id + "&title=" + val);

//最新章节
export const getNewChapter = (id: string) =>
    axios.get("/abc/book/simpleInfo.json?id=" + id);

//书籍评论
export const getComments = (id: string) =>
    axios.get("/abc/comment/getComments.json?bookId=" + id);

//所有频道    
export const getType = () =>
    axios.get("/abc/store/node.json?gender=1");

//频道下分类    
export const getTypeItem = (url: string) =>
    axios.get("/abc" + url);

//分类筛选条件    
export const getTypeItemScreen = (url: string) =>
    axios.get("/abc" + url);

//获取分类结果
export const getTypeItemRecord = (catId: string | number, wordCount: number, pay: number, bookStatus: number, sort: number, subCat?: number) =>
    axios.get("/abc/source/v2/searchBook.json", { params: { catId, wordCount, pay, bookStatus, sort, subCat } });

//排行榜分类
export const getRank = () =>
    axios.get("/abc/store/merged/rankNavi.json");

//排行榜列表
export const getRankList = (url: string) =>
    axios.get("/abc" + url);

//听书详情    
export const getListenBookMsg = (id: string) =>
    axios.get("/abc/ting/source.json?sourceUuid=" + id);

//听书章节列表    
export const getListenBookList = (id: string) =>
    axios.get("/abc/ting/catalog.json?sourceUuid=" + id);

//听书音频  
export const getListen = () =>
    axios.get("/abc/ting/download.json");