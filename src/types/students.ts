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
