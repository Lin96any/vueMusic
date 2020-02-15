const music = {
    state: {
        playlist: [],
        playlasttime:0,
        currentBs:null
    },
    mutations: {
        'SET_PLAYLIST': (state, list) => {
            state.playlist.push(...list)
        },
        'SET_PLAYLASTTIME':(state,time)=>{
            state.playlasttime = time
        },
        'SET_BS':(state,bs)=>{
            state.currentBs = bs;
        }
    },
    actions: {
        setPlaylist: ({ commit }, list) => {
           return commit('SET_PLAYLIST', list)
        },
        setplaylasttime:({commit},time)=>{
            return commit('SET_PLAYLASTTIME',time)
        },
        setbs:({commit},bs)=>{
            commit('SET_BS',bs)
        }
    }
}

export default music