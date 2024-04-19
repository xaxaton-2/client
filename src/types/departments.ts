export interface Department {
  id: number;
  name: string;
}

export interface DepartmentsState {
  departments: Department[];
  isLoading: boolean;
}
