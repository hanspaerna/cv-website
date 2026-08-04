import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "@/components/views/AboutView.vue";
import ProjectsView from "@/components/views/ProjectsView.vue";
import FeedbackView from "@/components/views/FeedbackView.vue";
import CvView from "@/components/views/CvView.vue";

const routes = [
    { path: '/', component: AboutView },
    { path: '/projects', component: ProjectsView },
    { path: '/feedback', component: FeedbackView },
    { path: '/cv', component: CvView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
