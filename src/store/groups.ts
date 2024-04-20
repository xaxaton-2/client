import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { Group, GroupsState } from '@/types/groups';
import { arrayToMap } from '@/utils/structures';

export const useGroupsStore = defineStore('groups', {
  state: (): GroupsState => ({
    groups: [],
    isLoading: false,
  }),
  getters: {
    groupsMap(): Record<number, Group> {
      return arrayToMap(this.groups, 'id');
    },
  },
  actions: {
    async getGroups() {
      this.isLoading = true;
      try {
        this.groups = [
          { id: 1, name: 'Архитектура', course: 2, departmentId: 1 },
          { id: 2, name: 'Дизайн архитектурной среды', course: 4, departmentId: 2 },
          { id: 3, name: 'Строительство', course: 3, departmentId: 3 },
          { id: 4, name: 'Технология и организация строительства', course: 4, departmentId: 4 },
          { id: 5, name: 'Техника и технологии строительства', course: 1, departmentId: 5 },
        ];
      } catch {
        message.error('Ошибка при загрузке групп!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
