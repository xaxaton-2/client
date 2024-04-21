export interface Faculty {
  id: number;
  name: string;
  universityId: number;
}

export interface FacultiesState {
  faculties: Faculty[];
  isLoading: boolean;
}

export type FacultiesResponse = {
  id: number;
  name: string;
  university_id: number;
}[];
