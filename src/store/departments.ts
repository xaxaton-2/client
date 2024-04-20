import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { Department, DepartmentsState } from '@/types/departments';
import { arrayToMap } from '@/utils/structures';

export const useDepartmentsStore = defineStore('departments', {
  state: (): DepartmentsState => ({
    departments: [],
    isLoading: false,
  }),
  getters: {
    departmentsMap(): Record<number, Department> {
      return arrayToMap(this.departments, 'id');
    },
  },
  actions: {
    async getDepartments() {
      this.isLoading = true;
      try {
        this.departments = [
          { id: 1, name: 'Кафедра автомобильных дорог и строительных материалов', facultyId: 1 },
          { id: 2, name: 'Кафедра архитектуры', facultyId: 2 },
          {
            id: 3,
            name: 'Кафедра начертательной геометрии, инженерной и компьютерной графики',
            facultyId: 3,
          },
          { id: 4, name: 'Кафедра строительных конструкций', facultyId: 4 },
          { id: 5, name: 'Кафедра теплогазоснабжения, вентиляции и гидромеханики', facultyId: 5 },
          { id: 6, name: 'Кафедра технологии строительного производства', facultyId: 6 },
        ];
      } catch {
        message.error('Ошибка при загрузке кафедр!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
