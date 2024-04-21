export interface Student {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  score: number;
  groupId: number;
  image: string | null;
}

export interface StudentsState {
  students: Student[];
  isLoading: boolean;
}

export interface StudentsParams {
  city?: string;
  university_id?: number;
  faculty_id?: number;
  course?: number;
  department_id?: number;
}

export type StudentsResponse = {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  score: number;
  group_id: number;
  image: string | null;
}[];
