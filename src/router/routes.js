
let routes = [
    {
        path: '/',
        redirect: '/home'
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
                component: () => import('components/singer/Singer.vue')
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