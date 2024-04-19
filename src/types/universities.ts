export interface University {
  id: number;
  name: string;
  image: string;
}

export interface UniversitiesState {
  universities: University[];
  isLoading: boolean;
}
