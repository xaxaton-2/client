<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { StarFilled } from '@ant-design/icons-vue';
import { Button, Card, Drawer, Flex, List, ListItem, Typography } from 'ant-design-vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import NewDepartmentForm from '@/components/faculties/NewDepartmentForm.vue';
import NewFacultyForm from '@/components/faculties/NewFacultyForm.vue';
import NewGroupForm from '@/components/faculties/NewGroupForm.vue';
import { useUniversity } from '@/composables/university';
import { useAuthStore } from '@/store/auth';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { useStudentsStore } from '@/store/students';
import { useUniversitiesStore } from '@/store/universities';
import { getFullName } from '@/utils/strings';

const route = useRoute();
const authStore = useAuthStore();
const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();
const studentsStore = useStudentsStore();

const isFacultyDrawerOpen = ref(false);
const isDepartmentDrawerOpen = ref(false);
const isGroupDrawerOpen = ref(false);

const id = computed(() => Number(route.params.id));

const { university, faculties, departments, groups, students } = useUniversity(id.value);

const isLoading = computed(() => {
  return (
    universitiesStore.isLoading ||
    facultiesStore.isLoading ||
    departmentsStore.isLoading ||
    groupsStore.isLoading ||
    studentsStore.isLoading
  );
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
      <List :data-source="faculties">
        <template #header>
          <Flex justify="space-between">
            <Typography>Факультеты</Typography>
            <Button
              v-if="authStore.data?.university?.id === university.id"
              @click="isFacultyDrawerOpen = true"
            >
              Добавить
            </Button>
          </Flex>
        </template>

        <template #renderItem="{ item }">
          <ListItem>{{ item.name }}</ListItem>
        </template>
      </List>
    </Card>

    <Card>
      <List :data-source="departments">
        <template #header>
          <Flex justify="space-between">
            <Typography>Кафедры</Typography>
            <Button
              v-if="authStore.data?.university?.id === university.id"
              @click="isDepartmentDrawerOpen = true"
            >
              Добавить
            </Button>
          </Flex>
        </template>

        <template #renderItem="{ item }">
          <ListItem>{{ item.name }}</ListItem>
        </template>
      </List>
    </Card>

    <Card>
      <List :data-source="groups">
        <template #header>
          <Flex justify="space-between">
            <Typography>Группы</Typography>
            <Button
              v-if="authStore.data?.university?.id === university.id"
              @click="isGroupDrawerOpen = true"
            >
              Добавить
            </Button>
          </Flex>
        </template>

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
              {{ groupsStore.groupsMap[item.groupId]?.name }} -
              {{ groupsStore.groupsMap[item.groupId]?.course }} курс
            </div>
          </ListItem>
        </template>
      </List>
    </Card>
  </Flex>

  <Drawer
    v-model:open="isFacultyDrawerOpen"
    title="Новый факультет"
    placement="right"
  >
    <NewFacultyForm @finish="isFacultyDrawerOpen = false" />
  </Drawer>

  <Drawer
    v-model:open="isDepartmentDrawerOpen"
    title="Новая кафедра"
    placement="right"
  >
    <NewDepartmentForm @finish="isDepartmentDrawerOpen = false" />
  </Drawer>

  <Drawer
    v-model:open="isGroupDrawerOpen"
    title="Новая группа"
    placement="right"
  >
    <NewGroupForm @finish="isGroupDrawerOpen = false" />
  </Drawer>
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
