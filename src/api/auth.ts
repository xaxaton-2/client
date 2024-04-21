import { api } from '@/core/api';
import {
  LoginData,
  LoginResponse,
  RegisterCompanyData,
  RegisterStudentData,
  RegisterUniversityData,
} from '@/types/auth';

export const login = async (data: LoginData) => {
  const res = await api.post<LoginResponse>('/login/', data);
  return res.data;
};

export const registerStudent = async (data: RegisterStudentData) => {
  const res = await api.post('/register/student/', data);
  return res.data;
};

export const registerUniversity = async (data: RegisterUniversityData) => {
  const res = await api.post('/register/university/', data);
  return res.data;
};

export const registerCompany = async (data: RegisterCompanyData) => {
  const res = await api.post('/register/company/', data);
  return res.data;
};
