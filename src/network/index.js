/* 网络请求主文件 */
import Banner from './Project/Banner'; //Banner请求方法
import { playlist, hotplaylist, SongListDetailsRequest, TopList } from './Project/Playlist' //歌单请求方法
import { newsmusic, hotSinger, singerMusic, singerHotMusic, MusicURL, Lyric } from './Project/Music'
import {
    search, Searchmatching, getSearchSinger,
    getSongDetail,
    getSearchSuggest,
    getSearchHot
} from './Project/search'
export {
    Banner,
    playlist,
    hotplaylist,
    newsmusic,
    hotSinger,
    singerMusic,
    singerHotMusic,
    MusicURL,
    Lyric,
    SongListDetailsRequest,
    TopList,
    search,
    Searchmatching,
    getSearchSinger,
    getSongDetail,
    getSearchSuggest,
    getSearchHot
}