let getters = {
    getPlaylist: state => state.music.playlist,
    getPlaylastTime: state => state.music.playlasttime,
    getbs: state => state.music.currentBs,
    getsingerid: state => state.music.singerid,
    getsinger: state => state.music.singer,
    getplaying: state => state.music.playing,
    getfullScreen: state => state.music.fullScreen,
    getplaylists: state => state.music.playlists,
    getsequenceList: state => state.music.sequenceList,
    getmode: state => state.music.mode,
    getcurrentIndex: state => state.music.currentIndex,
    getcurrentSong: state => {
        return state.music.playlists[state.music.currentIndex] || {}
    },
    getmusicUrl: state => state.music.MusicUrl,
    getbs: state => state.music.Bsobj,
    getsonglist: state => state.music.songlist,
    getsongdetials: state => state.music.SongDetials,
    getheardmusic: state => state.music.heardmusic
}

export default getters