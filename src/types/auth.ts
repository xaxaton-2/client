import { Student } from './students';
import { University } from './universities';

export interface AuthState {
  token: string | null;
  data: Omit<LoginResponse, 'token'> | null;
  isLoading: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterStudentData {
  email: string;
  name: string;
  surname: string;
  patronymic?: string;
  group_id: number;
  password: string;
}

export interface RegisterUniversityData {
  name: string;
  city: string;
  email: string;
  password: string;
}

export interface RegisterCompanyData {
  name: string;
  email: string;
  password: string;
}

export enum Role {
  Student,
  University,
  Company,
}

interface User {
  id: number;
  email: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  user: User;
  student?: Student;
  university?: University;
  company?: {
    id: number;
    name: string;
  };
}
