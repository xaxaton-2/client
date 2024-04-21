import { api } from '@/core/api';
import { CreateGroupData, Group, GroupsResponse } from '@/types/groups';

export const getGroups = async () => {
  const res = await api.get<GroupsResponse>('/groups/');
  return res.data.map<Group>((group) => ({
    id: group.id,
    name: group.name,
    course: group.course,
    departmentId: group.department_id,
  }));
};

export const createGroup = async (data: CreateGroupData) => {
  await api.post('/groups/', data);
};
