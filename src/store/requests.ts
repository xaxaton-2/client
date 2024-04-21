import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { RequestsState } from '@/types/requests';
import { sleep } from '@/utils/promises';

export const useRequestsStore = defineStore('requests', {
  state: (): RequestsState => ({
    requests: [],
    isLoading: false,
  }),
  actions: {
    async getRequests() {
      this.isLoading = true;
      try {
        await sleep();
        this.requests = [
          {
            id: 1,
            status: 'pending',
            eventId: 1,
            studentId: 1,
          },
          {
            id: 2,
            status: 'pending',
            eventId: 2,
            studentId: 2,
          },
          {
            id: 3,
            status: 'pending',
            eventId: 3,
            studentId: 3,
          },
        ];
      } catch {
        message.error('Ошибка при загрузке заявок!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
