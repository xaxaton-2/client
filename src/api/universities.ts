import { api } from '@/core/api';
import { University } from '@/types/universities';

export const getUniversities = async () => {
  const res = await api.get<University[]>('/universities/');
  return res.data;
};
