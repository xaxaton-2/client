<script setup lang="ts">
import { computed } from 'vue';
import { Card, Col, List, ListItem, Row, Typography } from 'ant-design-vue';
import BaseContainer from '@/components/base/BaseContainer.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { useUniversitiesStore } from '@/store/universities';
import { getEnding } from '@/utils/strings';

const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();

const count = computed(() => {
  const count = universitiesStore.universities.reduce<
    Record<number, { faculties: number; departments: number; groups: number }>
  >((acc, university) => {
    acc[university.id] = {
      faculties: 0,
      departments: 0,
      groups: 0,
    };
    return acc;
  }, {});

  facultiesStore.faculties.forEach((faculty) => {
    count[faculty.universityId].faculties++;
  });

  departmentsStore.departments.forEach((department) => {
    const faculty = facultiesStore.facultiesMap[department.facultyId];
    count[faculty.universityId].departments++;
  });

  groupsStore.groups.forEach((group) => {
    const department = departmentsStore.departmentsMap[group.departmentId];
    const faculty = facultiesStore.facultiesMap[department.facultyId];
    count[faculty.universityId].groups++;
  });

  return count;
});
</script>

<template>
  <BaseContainer>
    <Row
      v-if="universitiesStore.isLoading"
      :gutter="[24, 24]"
    >
      <Col
        v-for="n in 4"
        :key="n"
        :span="12"
      >
        <BaseSkeleton />
      </Col>
    </Row>

    <List
      v-else
      :grid="{ column: 2 }"
      :data-source="universitiesStore.universities"
    >
      <template #renderItem="{ item }">
        <ListItem>
          <RouterLink :to="`/universities/${item.id}`">
            <Card
              class="card"
              size="small"
              hoverable
            >
              <Typography>{{ item.name }} - {{ item.city }}</Typography>

              <Typography>
                {{
                  getEnding(count[item.id].faculties, ['факультет', 'факультета', 'факультетов'])
                }}
              </Typography>

              <Typography>
                {{ getEnding(count[item.id].departments, ['кафедра', 'кафедры', 'кафедр']) }}
              </Typography>

              <Typography>
                {{ getEnding(count[item.id].groups, ['группа', 'группы', 'групп']) }}
              </Typography>
            </Card>
          </RouterLink>
        </ListItem>
      </template>
    </List>
  </BaseContainer>
</template>

<style scoped lang="scss">
.card {
  text-align: center;
}
</style>
