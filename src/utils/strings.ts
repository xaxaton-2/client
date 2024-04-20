import { Student } from '@/types/students';

export const getFullName = (student: Student) => {
  return [student.surname, student.name, student.patronymic].filter(Boolean).join(' ');
};
