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

/* 根据id获取歌手单曲 */
let singerMusic = (id)=>{
    let url = '/artists?id='+id+'';
    return createAxios(url)
}

/* 根据id获取歌手50首热门歌曲 */
let singerHotMusic = (id) => {
    let url = '/artist/top/song?id=' + id + '';
    return createAxios(url)
}

let MusicURL = (id)=>{
    let url = '/song/url?id='+id+'';
    return createAxios(url)
}

/* 根据歌曲id获取歌词接口 */
let Lyric = (id) => {
    let url = '/lyric?id=' + id + '';
    return createAxios(url)
}

export {
    newsmusic,
    hotSinger,
    singerMusic,
    singerHotMusic,
    MusicURL,
    Lyric
}