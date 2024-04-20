import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { EventsState } from '@/types/events';
import { sleep } from '@/utils/promises';

export const useEventsStore = defineStore('events', {
  state: (): EventsState => ({
    events: [],
    eventTypesMap: {
      1: {
        id: 1,
        name: 'Наука',
        score: 5,
      },
      2: {
        id: 2,
        name: 'Спорт',
        score: 4,
      },
      3: {
        id: 3,
        name: 'Творчество',
        score: 3,
      },
      4: {
        id: 4,
        name: 'Волонтерство',
        score: 2,
      },
    },

    isLoading: false,
  }),
  actions: {
    async getEvents() {
      this.isLoading = true;
      try {
        await sleep();
        this.events = [
          {
            id: 1,
            name: 'Конференция по математике',
            date: '2024-04-28',
            eventTypeId: 1,
            universityId: 1,
          },
          {
            id: 2,
            name: 'Чемпионат по программированию',
            date: '2024-04-29',
            eventTypeId: 1,
            universityId: 1,
          },
          {
            id: 3,
            name: 'Соревнования по тяжелой атлетике',
            date: '2024-04-30',
            eventTypeId: 2,
            universityId: 1,
          },
        ];
      } catch {
        message.error('Ошибка при загрузке мероприятий!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
