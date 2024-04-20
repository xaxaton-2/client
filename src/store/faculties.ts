import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
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
        this.faculties = [
          { id: 1, name: 'Архитектурно-строительный факультет', universityId: 1 },
          { id: 2, name: 'Аэрокосмический институт', universityId: 2 },
          { id: 3, name: 'Институт математики и информационных технологий', universityId: 3 },
          { id: 4, name: 'Институт менеджмента, экономики и предпринимательства', universityId: 4 },
          { id: 5, name: 'Институт наук о Земле', universityId: 1 },
          {
            id: 6,
            name: 'Институт непрерывного профессионального образования ОГУ',
            universityId: 2,
          },
          { id: 7, name: 'Институт развития образования', universityId: 3 },
          { id: 8, name: 'Институт социальных и гуманитарных наук', universityId: 4 },
          { id: 9, name: 'Институт энергетики, электроники и связи', universityId: 1 },
          { id: 10, name: 'Институт языков и культур', universityId: 2 },
          { id: 11, name: 'Транспортный факультет', universityId: 3 },
          { id: 12, name: 'Факультет общественных профессий', universityId: 4 },
          { id: 13, name: 'Факультет подготовки иностранных граждан', universityId: 1 },
          { id: 14, name: 'Факультет прикладной биотехнологии и инженерии', universityId: 2 },
          { id: 15, name: 'Физический факультет', universityId: 3 },
          { id: 16, name: 'Химико-биологический факультет', universityId: 4 },
          { id: 17, name: 'Юридический факультет', universityId: 1 },
        ];
      } catch {
        message.error('Ошибка при загрузке факультетов!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
