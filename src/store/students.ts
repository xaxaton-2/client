import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { getStudents } from '@/api/students';
import { Student, StudentsState } from '@/types/students';
import { arrayToMap } from '@/utils/structures';

export const useStudentsStore = defineStore('students', {
  state: (): StudentsState => ({
    students: [],
    isLoading: false,
  }),
  getters: {
    studentsMap(): Record<number, Student> {
      return arrayToMap(this.students, 'id');
    },
  },
  actions: {
    async getStudents() {
      this.isLoading = true;
      try {
        this.students = await getStudents();
      } catch {
        message.error('Ошибка при загрузке студентов!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
