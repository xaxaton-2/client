export interface Group {
  id: number;
  name: string;
  course: number;
  departmentId: number;
}

export interface GroupsState {
  groups: Group[];
  isLoading: boolean;
}
