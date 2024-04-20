export interface EventType {
  id: number;
  name: string;
  score: number;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  eventType: EventType;
  universityId: number;
}

export interface Post {
  id: number;
  date: string;
  studentId: number;
  text: string;
  image?: string;
  hashtags: string;
  event: Event;
  likes: number;
}

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
}
