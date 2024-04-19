import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { FacultiesState } from '@/types/faculties';

export const useFacultiesStore = defineStore('faculties', {
  state: (): FacultiesState => ({
    faculties: [],
    isLoading: false,
  }),
  actions: {
    async getFaculties() {
      this.isLoading = true;
      try {
        this.faculties = [
          { id: 1, name: 'Архитектурно-строительный факультет' },
          { id: 2, name: 'Аэрокосмический институт' },
          { id: 3, name: 'Институт математики и информационных технологий' },
          { id: 4, name: 'Институт менеджмента, экономики и предпринимательства' },
          { id: 5, name: 'Институт наук о Земле' },
          { id: 6, name: 'Институт непрерывного профессионального образования ОГУ' },
          { id: 7, name: 'Институт развития образования' },
          { id: 8, name: 'Институт социальных и гуманитарных наук' },
          { id: 9, name: 'Институт энергетики, электроники и связи' },
          { id: 10, name: 'Институт языков и культур' },
          { id: 11, name: 'Транспортный факультет' },
          { id: 12, name: 'Факультет общественных профессий' },
          { id: 13, name: 'Факультет подготовки иностранных граждан' },
          { id: 14, name: 'Факультет прикладной биотехнологии и инженерии' },
          { id: 15, name: 'Физический факультет' },
          { id: 16, name: 'Химико-биологический факультет' },
          { id: 17, name: 'Юридический факультет' },
        ];
      } catch {
        message.error('Ошибка при загрузке факультетов!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
