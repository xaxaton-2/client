import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { GroupsState } from '@/types/groups';

export const useGroupsStore = defineStore('groups', {
  state: (): GroupsState => ({
    groups: [],
    isLoading: false,
  }),
  actions: {
    async getGroups() {
      this.isLoading = true;
      try {
        this.groups = [
          { id: 1, name: 'Архитектура', course: 2 },
          { id: 2, name: 'Дизайн архитектурной среды', course: 4 },
          { id: 3, name: 'Строительство', course: 3 },
          { id: 4, name: 'Технология и организация строительства', course: 4 },
          { id: 5, name: 'Техника и технологии строительства', course: 1 },
        ];
      } catch {
        message.error('Ошибка при загрузке групп!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
