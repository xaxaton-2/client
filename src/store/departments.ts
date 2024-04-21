import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { createDepartment, getDepartments } from '@/api/departments';
import { CreateDepartmentData, Department, DepartmentsState } from '@/types/departments';
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
        this.departments = await getDepartments();
      } catch {
        message.error('Ошибка при загрузке кафедр!');
      } finally {
        this.isLoading = false;
      }
    },
    async createDepartment(data: CreateDepartmentData) {
      this.isLoading = true;
      try {
        await createDepartment(data);
        this.departments = await getDepartments();
      } catch {
        message.error('Ошибка при добавлении кафедры!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
