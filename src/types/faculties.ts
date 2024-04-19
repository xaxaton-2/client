export interface Faculty {
  id: number;
  name: string;
}

export interface FacultiesState {
  faculties: Faculty[];
  isLoading: boolean;
}
