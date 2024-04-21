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

export type GroupsResponse = {
  id: number;
  name: string;
  course: number;
  department_id: number;
}[];

export interface CreateGroupData {
  name: string;
  course: number;
  department_id: number;
}
