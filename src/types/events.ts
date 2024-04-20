export interface EventType {
  id: number;
  name: string;
  score: number;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  eventTypeId: number;
  universityId: number;
}

export interface EventsState {
  events: Event[];
  eventTypesMap: Record<number, EventType>;
  isLoading: boolean;
}
