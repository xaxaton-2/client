export interface Department {
  id: number;
  name: string;
  facultyId: number;
}

export interface DepartmentsState {
  departments: Department[];
  isLoading: boolean;
}

export type DepartmentsResponse = {
  id: number;
  name: string;
  faculty_id: number;
}[];

export interface CreateDepartmentData {
  name: string;
  faculty_id: number;
}
