export interface Faculty {
  id: number;
  name: string;
  universityId: number;
}

export interface FacultiesState {
  faculties: Faculty[];
  isLoading: boolean;
}
