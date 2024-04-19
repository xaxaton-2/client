import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { DepartmentsState } from '@/types/departments';

export const useDepartmentsStore = defineStore('departments', {
  state: (): DepartmentsState => ({
    departments: [],
    isLoading: false,
  }),
  actions: {
    async getDepartments() {
      this.isLoading = true;
      try {
        this.departments = [
          { id: 1, name: 'Кафедра автомобильных дорог и строительных материалов' },
          { id: 2, name: 'Кафедра архитектуры' },
          { id: 3, name: 'Кафедра начертательной геометрии, инженерной и компьютерной графики' },
          { id: 4, name: 'Кафедра строительных конструкций' },
          { id: 5, name: 'Кафедра теплогазоснабжения, вентиляции и гидромеханики' },
          { id: 6, name: 'Кафедра технологии строительного производства' },
        ];
      } catch {
        message.error('Ошибка при загрузке кафедр!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
