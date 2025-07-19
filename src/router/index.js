import {createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home.vue";
import Index from "@/components/Index.vue";

const routes = [
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/index",
        component: Index,
    },
    {
        path: "/",
        redirect: "/index",
    }];
const router = createRouter( {
    history: createWebHistory(),
    routes,
} );
export default router;