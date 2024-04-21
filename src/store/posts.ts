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
        await sleep();
        for (let i = 0; i < 5; i++) {
          this.posts.push({
            id: i + 1,
            date: '2024-04-10T09:31:47.219Z',
            studentId: 3,
            text: 'Вчера на олимпиаде по программированию мы продемонстрировали нашу высокую профессиональную подготовку и умения в области информационных технологий. Наша команда успешно справилась с поставленными задачами и показала отличные результаты.\nМы были готовы к сложным испытаниям и смогли проявить свою креативность и логическое мышление. Наша команда отлично сработалась во время совместной работы и смогла найти эффективные решения для задач.\nМы гордимся нашим достижением на олимпиаде и уверены, что это лишь первый шаг к новым победам. Мы будем продолжать развиваться и совершенствовать свои навыки в программировании, чтобы добиваться еще более впечатляющих результатов.\nСпасибо всем, кто нас поддерживал и верил в нас. Мы готовы к новым вызовам и будем стараться достичь еще больших вершин в мире информационных технологий.',
            image: Math.random() > 0.5 ? 'https://placehold.co/100' : null,
            hashtags: 'огу,вуз,олимпиада,программирование,айти,c++,c#,java,javascript,python',
            event: {
              id: 1,
              name: 'Чемпионат по программированию',
              date: '2024-04-30',
              eventTypeId: 1,
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
