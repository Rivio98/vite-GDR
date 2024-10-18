import { createRouter, createWebHistory } from "vue-router";
import PageHome from "./pages/PageHome.vue";
import PageCharacters from "./pages/PageCharacters.vue";

// import AppPageNotFound from "./pages/AppPageNotFound.vue";

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
        // {
        //     path: '/contacts',
        //     name: 'contact',
        //     component: AppContact
        // },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: AppPageNotFound
        // },
    ]
});

export {
    router
};