import {mapGetters,mapActions} from 'vuex'

let Mixins = {
    computed: {
        ...mapGetters()
    },
    methods: {
        ...mapActions()
    },
}