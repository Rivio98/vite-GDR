import { createRouter, createWebHistory } from "vue-router";
import PageHome from "./pages/PageHome.vue";
import PageCharacters from "./pages/PageCharacters.vue";
import PageNotFound from "./pages/PageNotFound.vue";
import PageShowCharacter from "./pages/PageShowCharacter.vue";
import PageFight from "./pages/PageFight.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: PageHome
        },
        {
            path: '/characters',
            name: 'characters',
            component: PageCharacters
        },
        {
            path: '/character/:slug',
            name: 'character',
            component: PageShowCharacter
        },
        {
            path: '/fight',
            name: 'fight',
            component: PageFight
        },
        // {
        //     path: '/contacts',
        //     name: 'contact',
        //     component: AppContact
        // },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: PageNotFound
        },
    ]
});

export {
    router
};