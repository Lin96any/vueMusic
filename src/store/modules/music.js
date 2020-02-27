const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}
import { shuffle } from 'utials/utials'

const music = {
    state: {
        playlist: [],
        playlasttime: 0,
        currentBs: null,
        singerid: {},
        musicList: {},
        /* 歌曲地址 */
        MusicUrl: [],
        singer: {},
        // 播放
        playing: false,
        // 全屏
        fullScreen: false,
        playlists: [],
        // 顺序列表
        sequenceList: [],
        // 播放模式
        mode: playMode.sequence,
        // 当前播放索引
        currentIndex: -1,
        /* scroll对象 */
        Bsobj: {},
        /* 歌单 */
        songlist: {},
        /* 排行榜 */
        SongDetials: [],
        heardmusic:null,
    },
    mutations: {
        'SET_HEARDMUSIC': (state, music) => {
            state.heardmusic = music;
        },
        'SET_SONGDETIALS': (state, list) => {
            state.SongDetials = list;
        },
        'SET_SONGLIST': (state, obj) => {
            state.songlist = obj;
        },
        'SET_BSOBJ': (state, obj) => {
            state.Bsobj = obj
        },
        //歌单列表
        'SET_PLAYLIST': (state, list) => {
            state.playlist.push(...list)
        },
        'SET_PLAYLASTTIME': (state, time) => {
            state.playlasttime = time
        },
        'SET_BS': (state, bs) => {
            state.currentBs = bs;
        },
        'SET_SINGERID': (state, id) => {
            state.singerid = id
        },
        'SET_SINGER': (state, singer) => {
            state.singer = singer
        },
        'SET_PLAYING': (state, playing) => {
            state.playing = playing
        },
        'SET_FULLSCREEN': (state, screen) => {
            state.fullScreen = screen
        },
        'SET_PLAYLISTS': (state, list) => {
            state.playlists = list
        },
        'SET_SEQUENCELIST': (state, list) => {
            state.sequenceList = list
        },
        'SET_CURRENINDEX': (state, index) => {
            state.currentIndex = index
        },
        'SET_MODE': (state, mode) => {
            state.mode = mode
        },
        'SET_MUSICURL': (state, url) => {
            state.MusicUrl = url
        }
    },
    actions: {
        setheardmusic: ({ commit }, music) => {
            commit('SET_HEARDMUSIC', music)
        },
        setsongdetials:({commit},list)=>{
            commit('SET_SONGDETIALS',list)
        },
        setsonglist: ({ commit }, obj) => {
            commit('SET_SONGLIST', obj)
        },
        setbsobj: ({ commit }, obj) => {
            commit('SET_BSOBJ', obj)
        },
        setMusicUrl: ({ commit }, url) => {
            commit('SET_MUSICURL', url)
        },
        setPlaylist: ({ commit }, list) => {
            return commit('SET_PLAYLIST', list)
        },
        setplaylasttime: ({ commit }, time) => {
            return commit('SET_PLAYLASTTIME', time)
        },
        setbs: ({ commit }, bs) => {
            commit('SET_BS', bs)
        },
        setsingerid: ({ commit }, id) => {
            commit('SET_SINGERID', id)
        },
        setsinger: ({ commit }, singer) => {
            commit('SET_SINGER', singer)
        },
        setplaying: ({ commit }, playing) => {
            commit('SET_PLAYING', playing)
        },

        setfullScreen: ({ commit }, screen) => {
            commit('SET_FULLSCREEN', screen)
        },

        setplaylists: ({ commit }, list) => {
            commit('SET_PLAYLISTS', list)
        },

        setsequenceList: ({ commit }, list) => {
            commit('SET_SEQUENCELIST', list)
        },

        setcurrentIndex: ({ commit }, index) => {
            commit('SET_CURRENINDEX', index)
        },

        setmode: ({ commit }, mode) => {
            commit('SET_MODE', mode)
        },
        selectPlay: ({ commit }, { list, index }) => {
            commit('SET_SEQUENCELIST', list);
            commit('SET_PLAYLISTS', list);
            commit('SET_CURRENINDEX', index);
            commit('SET_FULLSCREEN', true);
            commit('SET_PLAYING', true);
        },
        randomPlay: ({ commit }, { list }) => {
            commit('SET_MODE', playMode.random)
            commit('SET_SEQUENCELIST', list)
            let randomList = shuffle(list)
            commit('SET_PLAYLISTS', randomList)
            commit('SET_CURRENINDEX', 0)
            commit('SET_FULLSCREEN', true)
            commit('SET_PLAYING', true)
        }
    }
}

export default music