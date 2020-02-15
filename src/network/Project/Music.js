import createAxios from '../Axios/axios';

/* 新歌速递 */
let newsmusic = (type) => {
    let url = '/top/song ? type =' + type + '';
    return createAxios(url)
}

/* 获取热门歌手 */
let hotSinger = (offset,limit)=>{
    let url = '/top/artists?offset=' + offset + '&limit=' + limit+'';
    return createAxios(url)
}

export {
    newsmusic,
    hotSinger
}