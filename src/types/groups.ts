export interface Group {
  id: number;
  name: string;
  course: number;
}

export interface GroupsState {
  groups: Group[];
  isLoading: boolean;
}
