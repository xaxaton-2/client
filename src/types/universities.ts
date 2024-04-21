export interface University {
  id: number;
  name: string;
  city: string;
  image: string | null;
}

export interface UniversitiesState {
  universities: University[];
  isLoading: boolean;
}
