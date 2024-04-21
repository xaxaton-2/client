import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { getUniversities } from '@/api/universities';
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
        this.universities = await getUniversities();
      } catch {
        message.error('Ошибка при загрузке университетов!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
