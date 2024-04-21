import { api } from '@/core/api';
import { CreateDepartmentData, Department, DepartmentsResponse } from '@/types/departments';

export const getDepartments = async () => {
  const res = await api.get<DepartmentsResponse>('/departments/');
  return res.data.map<Department>((department) => ({
    id: department.id,
    name: department.name,
    facultyId: department.faculty_id,
  }));
};

export const createDepartment = async (data: CreateDepartmentData) => {
  await api.post('/departments/', data);
};
