
let routes = [
    {
        path: '/',
        redirect: '/home/recoments'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('views/home/Home.vue'),
        children:[
            {
                path: 'recoments',
                name: 'Recoments',
                component: () => import('components/recoments/Recoments.vue')
            },
            {
                path: 'singer',
                name: 'Singer',
                component: () => import('components/singer/Singer.vue'),
                children:[
                    {
                        path:'singerdetial',
                        name:'SingerDetails',
                        component: () => import('components/singer/Children/SingerDetails')
                    }
                ]
            },
            {
                path: 'rank',
                name: 'Rank',
                component: () => import('components/rank/Rank.vue')
            }
        ]
    },

];

export default routes;