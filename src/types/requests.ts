export type RequestStatus = 'pending' | 'accepted' | 'denied';

export interface Request {
  id: number;
  status: RequestStatus;
  eventId: number;
  studentId: number;
}

export interface RequestsState {
  requests: Request[];
  isLoading: boolean;
}
