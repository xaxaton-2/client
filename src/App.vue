<script setup lang="ts">
import { onMounted } from 'vue';
import locale from 'ant-design-vue/es/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Header from './components/base/Header.vue';
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
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#f7b313',
      },
    }"
    :locale="locale"
  >
    <Header />
    <router-view />
  </a-config-provider>
</template>
