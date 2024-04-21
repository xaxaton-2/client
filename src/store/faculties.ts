import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { createFaculty, getFaculties } from '@/api/faculties';
import { FacultiesState, Faculty } from '@/types/faculties';
import { arrayToMap } from '@/utils/structures';

export const useFacultiesStore = defineStore('faculties', {
  state: (): FacultiesState => ({
    faculties: [],
    isLoading: false,
  }),
  getters: {
    facultiesMap(): Record<number, Faculty> {
      return arrayToMap(this.faculties, 'id');
    },
  },
  actions: {
    async getFaculties() {
      this.isLoading = true;
      try {
        this.faculties = await getFaculties();
      } catch {
        message.error('Ошибка при загрузке факультетов!');
      } finally {
        this.isLoading = false;
      }
    },
    async createFaculty(name: string) {
      this.isLoading = true;
      try {
        await createFaculty(name);
        this.faculties = await getFaculties();
      } catch {
        message.error('Ошибка при добавлении факультета!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
