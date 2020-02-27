///search/hot/detail
import createAxios from '../Axios/axios';
// 热搜列表(详细) 
const search = () => {
    let url = '/search/hot/detail';
    return createAxios(url)
}

//多重匹配
const Searchmatching = (val, offset) => {
    let url = '/search?keywords=' + val +  '&offset=' + offset;
    return createAxios(url)
}
//搜索歌手数据
const getSearchSinger = (val) => {
    let url = '/search/suggest?keywords=' + val +'&type='+100;
    return createAxios(url)
}

//搜索歌曲详情
const getSongDetail = (id) => {
    let url = `/song/detail?ids=${id}`;
    return createAxios(url)
}

//搜索建议
const getSearchSuggest = (val) => {
    let url = '/search/suggest?keywords=' + val;
    return createAxios(url)
}


const getSearchHot= (id)=>{
    const url = HOST + `/search/hot`
    return createAxios(url)
}

export {
    search,
    Searchmatching,
    getSearchSinger,
    getSongDetail,
    getSearchSuggest,
    getSearchHot
}