import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { PostsState } from '@/types/posts';
import { sleep } from '@/utils/promises';

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    isLoading: false,
  }),
  actions: {
    async getPosts() {
      this.isLoading = true;
      try {
        await sleep(1000);
        for (let i = 0; i < 5; i++) {
          this.posts.push({
            id: i + 1,
            date: '2024-04-10T09:31:47.219Z',
            studentId: i + 1,
            text: 'harder lion avoid since setting deeply forgotten thank common cabin gain hour hat fierce size exact street nearer command compass burst black slept method lesson great excellent muscle must care flies effort share pleasant so war meal national second constantly run story allow carefully exchange strange sing highway',
            image: Math.random() > 0.5 ? 'https://placehold.co/100' : undefined,
            hashtags: 'lonely,gravity,history,written,cost,degree,melted,poor,truck,fifth',
            event: {
              id: 1,
              name: 'Чемпионат по программированию',
              date: '2024-30-04',
              eventType: {
                id: 1,
                name: 'Наука',
                score: 5,
              },
              universityId: 1,
            },
            likes: Math.floor(Math.random() * 1000),
          });
        }
      } catch {
        message.error('Ошибка при загрузке публикаций!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
