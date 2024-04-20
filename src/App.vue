<script setup lang="ts">
import { onMounted } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import locale from 'ant-design-vue/es/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useDepartmentsStore } from './store/departments';
import { useFacultiesStore } from './store/faculties';
import { useGroupsStore } from './store/groups';
import { useUniversitiesStore } from './store/universities';

dayjs.locale('ru');

const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();

onMounted(async () => {
  await Promise.all([
    universitiesStore.getUniversities(),
    facultiesStore.getFaculties(),
    departmentsStore.getDepartments(),
    groupsStore.getGroups(),
  ]);
});

// TODO профиль студента
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
