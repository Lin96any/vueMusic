import {mapGetters,mapActions} from 'vuex';
import { debounce } from "utials/utials";
let Mixins = {
    computed: {
        ...mapGetters(['getPlaylist', 'getPlaylastTime','getbs']),
        boudou(){
           return debounce(this.getbs.refresh, 1000)
        }
    },
    methods: {
        ...mapActions(['setPlaylist', 'setplaylasttime','setbs']),
        // imgload(){
        //     this.boudou()
        // }
    },
}

export default Mixins