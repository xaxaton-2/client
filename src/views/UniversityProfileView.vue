<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { StarFilled } from '@ant-design/icons-vue';
import { Card, Flex, List, ListItem } from 'ant-design-vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { useStudentsStore } from '@/store/students';
import { useUniversitiesStore } from '@/store/universities';
import { getFullName } from '@/utils/strings';

const route = useRoute();
const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();
const studentsStore = useStudentsStore();

const id = computed(() => Number(route.params.id));

const isLoading = computed(() => {
  return (
    universitiesStore.isLoading ||
    facultiesStore.isLoading ||
    departmentsStore.isLoading ||
    groupsStore.isLoading ||
    studentsStore.isLoading
  );
});

const university = computed(() => {
  return universitiesStore.universitiesMap[id.value];
});

const faculties = computed(() => {
  return facultiesStore.faculties.filter((faculty) => faculty.universityId === id.value);
});

const departments = computed(() => {
  return departmentsStore.departments.filter((department) => {
    const faculty = facultiesStore.facultiesMap[department.facultyId];
    return faculty.universityId === id.value;
  });
});

const groups = computed(() => {
  return groupsStore.groups.filter((group) => {
    const department = departmentsStore.departmentsMap[group.departmentId];
    const faculty = facultiesStore.facultiesMap[department.facultyId];
    return faculty.universityId === id.value;
  });
});

const students = computed(() => {
  return studentsStore.students.filter((student) => {
    const group = groupsStore.groupsMap[student.groupId];
    const department = departmentsStore.departmentsMap[group.departmentId];
    const faculty = facultiesStore.facultiesMap[department.facultyId];
    return faculty.universityId === id.value;
  });
});
</script>

<template>
  <BaseSkeleton
    v-if="isLoading"
    :count="3"
  />

  <Flex
    v-else-if="university"
    gap="large"
    vertical
  >
    <Card>{{ university.name }} - {{ university.city }}</Card>

    <Card>
      <List
        header="Факультеты"
        :data-source="faculties"
      >
        <template #renderItem="{ item }">
          <ListItem>{{ item.name }}</ListItem>
        </template>
      </List>
    </Card>

    <Card>
      <List
        header="Кафедры"
        :data-source="departments"
      >
        <template #renderItem="{ item }">
          <ListItem>{{ item.name }}</ListItem>
        </template>
      </List>
    </Card>

    <Card>
      <List
        header="Группы"
        :data-source="groups"
      >
        <template #renderItem="{ item }">
          <ListItem>{{ item.name }}</ListItem>
        </template>
      </List>
    </Card>

    <Card>
      <List
        header="Студенты"
        :data-source="students"
      >
        <template #renderItem="{ item }">
          <ListItem class="student">
            <div>{{ getFullName(item) }} <StarFilled class="star" /> {{ item.score }}</div>

            <div>
              {{ groupsStore.groupsMap[item.groupId].name }} -
              {{ groupsStore.groupsMap[item.groupId].course }} курс
            </div>
          </ListItem>
        </template>
      </List>
    </Card>
  </Flex>
</template>

<style scoped lang="scss">
.student {
  flex-direction: column;
  align-items: flex-start;
}

.star {
  color: $primary;
}
</style>
