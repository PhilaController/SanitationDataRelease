import Vue from "vue";
import Router from "vue-router";
import Explorer from "@/views/explorer"
import Analysis from "@/views/analysis"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: Analysis
        },
        {
            path: "/explorer",
            component: Explorer
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

