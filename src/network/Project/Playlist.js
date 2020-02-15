import createAxios from '../Axios/axios';

//精品歌单
const playlist = (before='', limit=50)=>{
    let url = '/top/playlist/highquality?before=' + before + '&limit=' + limit + '';
    return createAxios(url)
}

//歌单 ( 网友精选碟 )
const hotplaylist = (order='undefined', limit=12)=>{
    let url = '/top/playlist?limit=' + limit + '&order=' + order + '';
    return createAxios(url)
}

export {
    playlist,
    hotplaylist
}