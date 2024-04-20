import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { Student, StudentsState } from '@/types/students';
import { sleep } from '@/utils/promises';
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
        await sleep();
        this.students = [
          {
            id: 1,
            name: 'Иван',
            surname: 'Иванов',
            patronymic: 'Иванович',
            score: 85,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 1,
          },
          {
            id: 2,
            name: 'Петр',
            surname: 'Петров',
            patronymic: 'Петрович',
            score: 72,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 2,
          },
          {
            id: 3,
            name: 'Мария',
            surname: 'Сидорова',
            patronymic: 'Алексеевна',
            score: 90,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 3,
          },
          {
            id: 4,
            name: 'Елена',
            surname: 'Смирнова',
            patronymic: 'Дмитриевна',
            score: 78,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 4,
          },
          {
            id: 5,
            name: 'Александр',
            surname: 'Кузнецов',
            patronymic: 'Александрович',
            score: 65,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 5,
          },
          {
            id: 6,
            name: 'Ольга',
            surname: 'Михайлова',
            patronymic: 'Ивановна',
            score: 87,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 1,
          },
          {
            id: 7,
            name: 'Сергей',
            surname: 'Васильев',
            patronymic: 'Владимирович',
            score: 80,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 2,
          },
          {
            id: 8,
            name: 'Наталья',
            surname: 'Павлова',
            patronymic: 'Алексеевна',
            score: 92,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 3,
          },
          {
            id: 9,
            name: 'Андрей',
            surname: 'Соколов',
            patronymic: 'Сергеевич',
            score: 75,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 4,
          },
          {
            id: 10,
            name: 'Екатерина',
            surname: 'Федорова',
            patronymic: 'Андреевна',
            score: 82,
            image:
              'https://sun9-68.userapi.com/impg/aezKRHNTBKozgFb8hPDLLJX0qPjszkrszXZ8DQ/0MKQKSTJ2zQ.jpg?size=1037x1707&quality=95&sign=79ffbafdfabbcfe506740dcc17c61753&type=album',
            groupId: 5,
          },
        ];
      } catch {
        message.error('Ошибка при загрузке студентов!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
