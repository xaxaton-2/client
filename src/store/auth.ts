import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { auth, login, registerCompany, registerStudent, registerUniversity } from '@/api/auth';
import {
  AuthState,
  LoginData,
  RegisterCompanyData,
  RegisterStudentData,
  RegisterUniversityData,
} from '@/types/auth';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    data: null,
    isLoading: false,
  }),
  getters: {
    isAuth(): boolean {
      return Boolean(this.token);
    },
  },
  actions: {
    logout() {
      this.token = null;
      this.data = null;
      localStorage.removeItem('token');
    },
    async login(data: LoginData) {
      this.isLoading = true;
      try {
        const { token, ...rest } = await login(data);
        this.token = token;
        this.data = rest;
        localStorage.setItem('token', token);
      } catch {
        message.error('Неверный email или пароль!');
      } finally {
        this.isLoading = false;
      }
    },
    async auth(token: string) {
      this.isLoading = true;
      try {
        const data = await auth(token);
        this.token = data.token;
        this.data = data;
        localStorage.setItem('token', data.token);
      } catch {
        message.error('Неверный email или пароль!');
      } finally {
        this.isLoading = false;
      }
    },
    async registerStudent(data: RegisterStudentData) {
      this.isLoading = true;
      try {
        this.token = await registerStudent(data);
      } catch {
        message.error('Ошибка при регистрации!');
      } finally {
        this.isLoading = false;
      }
    },
    async registerUniversity(data: RegisterUniversityData) {
      this.isLoading = true;
      try {
        this.token = await registerUniversity(data);
      } catch {
        message.error('Ошибка при регистрации!');
      } finally {
        this.isLoading = false;
      }
    },
    async registerCompany(data: RegisterCompanyData) {
      this.isLoading = true;
      try {
        this.token = await registerCompany(data);
      } catch {
        message.error('Ошибка при регистрации!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
