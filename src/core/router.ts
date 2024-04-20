import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import StudentLayout from '@/layouts/StudentLayout.vue';
import LoginView from '@/views/LoginView.vue';
import MainView from '@/views/MainView.vue';
import PostsView from '@/views/PostsView.vue';
import RegisterView from '@/views/RegisterView.vue';
import StudentPostsView from '@/views/StudentPostsView.vue';
import StudentProfileView from '@/views/StudentProfileView.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          component: MainView,
        },
        {
          path: '/login',
          component: LoginView,
        },
        {
          path: '/register',
          redirect: '/register/student',
          children: [
            {
              path: '/register/:key',
              component: RegisterView,
            },
          ],
        },
        {
          path: '/posts',
          component: PostsView,
        },
        {
          path: '/students/:id',
          component: StudentLayout,
          children: [
            {
              path: '/students/:id',
              name: 'student-profile',
              component: StudentProfileView,
            },
            {
              path: '/students/:id/posts',
              name: 'student-posts',
              component: StudentPostsView,
            },
          ],
        },
      ],
    },
  ],
});
