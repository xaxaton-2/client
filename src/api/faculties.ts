import { api } from '@/core/api';
import { FacultiesResponse, Faculty } from '@/types/faculties';

export const getFaculties = async () => {
  const res = await api.get<FacultiesResponse>('/faculties/');
  return res.data.map<Faculty>((faculty) => ({
    id: faculty.id,
    name: faculty.name,
    universityId: faculty.university_id,
  }));
};

export const createFaculty = async (name: string) => {
  await api.post('/faculties/', { name });
};
