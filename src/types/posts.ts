import { Event } from './events';

export interface Post {
  id: number;
  date: string;
  studentId: number;
  text: string;
  image: string | null;
  hashtags: string;
  event: Event;
  likes: number;
}

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
}
