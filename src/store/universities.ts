import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { UniversitiesState } from '@/types/universities';

export const useUniversitiesStore = defineStore('universities', {
  state: (): UniversitiesState => ({
    universities: [],
    isLoading: false,
  }),
  actions: {
    async getUniversities() {
      this.isLoading = true;
      try {
        this.universities = [
          {
            id: 1,
            name: 'ОГУ',
            image: 'https://placehold.co/100',
          },
          {
            id: 2,
            name: 'ОГАУ',
            image: 'https://placehold.co/100',
          },
          {
            id: 3,
            name: 'ОГПУ',
            image: 'https://placehold.co/100',
          },
          {
            id: 4,
            name: 'ОрГМУ',
            image: 'https://placehold.co/100',
          },
        ];
      } catch {
        message.error('Ошибка при загрузке университетов!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
