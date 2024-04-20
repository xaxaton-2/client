import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import StudentLayout from '@/layouts/StudentLayout.vue';
import UniversityLayout from '@/layouts/UniversityLayout.vue';
import AboutView from '@/views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import MainView from '@/views/MainView.vue';
import PartnersView from '@/views/PartnersView.vue';
import PostsView from '@/views/PostsView.vue';
import PrivacyView from '@/views/PrivacyView.vue';
import RegisterView from '@/views/RegisterView.vue';
import StudentEventsView from '@/views/StudentEventsView.vue';
import StudentPostsView from '@/views/StudentPostsView.vue';
import StudentProfileView from '@/views/StudentProfileView.vue';
import TermsOfUseView from '@/views/TermsOfUseView.vue';
import UniversitiesView from '@/views/UniversitiesView.vue';
import UniversityEventsView from '@/views/UniversityEventsView.vue';
import UniversityProfileView from '@/views/UniversityProfileView.vue';
import UniversityRequestsView from '@/views/UniversityRequestsView.vue';

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
            {
              path: '/students/:id/events',
              name: 'student-events',
              component: StudentEventsView,
            },
          ],
        },
        {
          path: '/universities',
          component: UniversitiesView,
        },
        {
          path: '/universities/:id',
          component: UniversityLayout,
          children: [
            {
              path: '/universities/:id',
              name: 'university-profile',
              component: UniversityProfileView,
            },
            {
              path: '/universities/:id/events',
              name: 'university-events',
              component: UniversityEventsView,
            },
            {
              path: '/universities/:id/requests',
              name: 'university-requests',
              component: UniversityRequestsView,
            },
          ],
        },
        {
          path: '/partners',
          component: PartnersView,
        },
        {
          path: '/about',
          component: AboutView,
        },
        {
          path: '/privacy',
          component: PrivacyView,
        },
        {
          path: '/terms-of-use',
          component: TermsOfUseView,
        },
      ],
    },
  ],
});
