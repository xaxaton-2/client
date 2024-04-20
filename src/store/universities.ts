import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { UniversitiesState, University } from '@/types/universities';
import { arrayToMap } from '@/utils/structures';

export const useUniversitiesStore = defineStore('universities', {
  state: (): UniversitiesState => ({
    universities: [],
    isLoading: false,
  }),
  getters: {
    universitiesMap(): Record<number, University> {
      return arrayToMap(this.universities, 'id');
    },
  },
  actions: {
    async getUniversities() {
      this.isLoading = true;
      try {
        this.universities = [
          {
            id: 1,
            name: 'ОГУ',
            city: 'Оренбург',
            image: 'https://placehold.co/100',
          },
          {
            id: 2,
            name: 'ОГАУ',
            city: 'Оренбург',
            image: 'https://placehold.co/100',
          },
          {
            id: 3,
            name: 'ОГПУ',
            city: 'Оренбург',
            image: 'https://placehold.co/100',
          },
          {
            id: 4,
            name: 'ОрГМУ',
            city: 'Оренбург',
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
