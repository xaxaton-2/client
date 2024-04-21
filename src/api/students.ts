import { api } from '@/core/api';
import { Student, StudentsParams, StudentsResponse } from '@/types/students';

export const getStudents = async (params: StudentsParams = {}) => {
  const res = await api.get<StudentsResponse>('/students/', { params });
  return res.data.map<Student>((student) => ({
    id: student.id,
    name: student.name,
    surname: student.surname,
    patronymic: student.patronymic,
    score: student.score,
    groupId: student.group_id,
    image: student.image,
  }));
};
