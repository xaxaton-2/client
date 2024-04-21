<script setup lang="ts">
import { onMounted } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import locale from 'ant-design-vue/es/locale/ru_RU';
import { useAuthStore } from './store/auth';
import { useDepartmentsStore } from './store/departments';
import { useFacultiesStore } from './store/faculties';
import { useGroupsStore } from './store/groups';
import { useStudentsStore } from './store/students';
import { useUniversitiesStore } from './store/universities';

const authStore = useAuthStore();
const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();
const studentsStore = useStudentsStore();

onMounted(async () => {
  const token = localStorage.getItem('token');

  await Promise.all([
    ...(token ? [authStore.auth(token)] : []),
    universitiesStore.getUniversities(),
    facultiesStore.getFaculties(),
    departmentsStore.getDepartments(),
    groupsStore.getGroups(),
    studentsStore.getStudents(),
  ]);
});
</script>

<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#f7b313',
      },
    }"
    :locale="locale"
  >
    <RouterView />
  </ConfigProvider>
</template>
