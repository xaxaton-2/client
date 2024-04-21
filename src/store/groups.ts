import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { createGroup, getGroups } from '@/api/groups';
import { CreateGroupData, Group, GroupsState } from '@/types/groups';
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
        this.groups = await getGroups();
      } catch {
        message.error('Ошибка при загрузке групп!');
      } finally {
        this.isLoading = false;
      }
    },
    async createGroup(data: CreateGroupData) {
      this.isLoading = true;
      try {
        await createGroup(data);
        this.groups = await getGroups();
      } catch {
        message.error('Ошибка при добавлении групп!');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
