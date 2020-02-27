import { mapGetters, mapActions } from 'vuex';
import { debounce } from "utials/utials";
let Mixins = {
    computed: {
        ...mapGetters(['getPlaylist', 'getPlaylastTime',
            'getbs', 'getsingerid',
            'getsinger', 'getplaying',
            'getfullScreen', 'getplaylists',
            'getsequenceList',
            'getmode',
            'getcurrentIndex',
            'getcurrentSong'
            , 'getmusicUrl'
            , 'getbs', 'getsonglist',
            'getsongdetials','getheardmusic']),
        boudou() {
            return debounce(this.getbs.refresh, 1000)
        }
    },
    mounted() {
        if (this.handle) {
            this.handle(this.getplaylists);
        }
    },
    methods: {
        ...mapActions(['setPlaylist',
            'setplaylasttime',
            'setbs',
            'setsingerid',
            'setsinger',
            'setplaying',
            'setfullScreen',
            'setplaylists',
            'setsequenceList',
            'setcurrentIndex',
            'setmode', 'selectPlay', 'setMusicUrl', 'setbsobj',
            'setsonglist', 'randomPlay', 'setsongdetials','setheardmusic']),
    },

    watch: {
        getplaylists(newval) {
            if (this.handle) {
                this.handle(newval);
            }
        }
    }
}

export default Mixins