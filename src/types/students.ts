export interface Student {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  score: number;
  image: string;
  groupId: number;
}

export interface StudentsState {
  students: Student[];
  isLoading: boolean;
}
