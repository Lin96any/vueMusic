import { mapGetters, mapActions } from 'vuex';
import { debounce } from "utials/utials";
import { singerMusic, singerHotMusic, MusicURL } from "network";
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
            ,'getbs']),
        boudou() {
            return debounce(this.getbs.refresh, 1000)
        }
    },
    mouted() {
        this.handle(this.getplaylists)
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
            'setmode', 'selectPlay', 'setMusicUrl','setbsobj']),
    },

    watch: {
    }
}

export default Mixins