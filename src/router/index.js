import {createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home.vue";
import Index from "@/components/Index.vue";
import Test from "@/components/Test.vue";
import Hobby from "@/components/home/Hobby.vue";

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/test",
                name: "Test",
                component: Test,
            },
            {
                path: "/hobby",
                name: "Hobby",
                component: Hobby,
            }],
    },
    {
        path: "/index",
        name: "Index",
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