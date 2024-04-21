export interface University {
  id: number;
  name: string;
  city: string;
  image: string | null;
  score: number;
}

export interface UniversitiesState {
  universities: University[];
  isLoading: boolean;
}
