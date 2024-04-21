import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { getStudents } from '@/api/students';
import { Student, StudentsParams, StudentsState } from '@/types/students';
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
    async getStudents(params: StudentsParams = {}) {
      this.isLoading = true;
      try {
        this.students = await getStudents(params);
      } catch {
        message.error('Ошибка при загрузке студентов!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
