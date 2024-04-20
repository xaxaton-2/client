export interface Department {
  id: number;
  name: string;
  facultyId: number;
}

export interface DepartmentsState {
  departments: Department[];
  isLoading: boolean;
}
