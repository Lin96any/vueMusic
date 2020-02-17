let getters = {
    getPlaylist: state => state.music.playlist,
    getPlaylastTime: state => state.music.playlasttime,
    getbs: state => state.music.currentBs,
    getsingerid: state => state.music.singerid
}

export default getters