<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Container from '@/components/base/Container.vue';
import CompanyRegisterForm from '@/components/register/CompanyRegisterForm.vue';
import StudentRegisterForm from '@/components/register/StudentRegisterForm.vue';
import UniversityRegisterForm from '@/components/register/UniversityRegisterForm.vue';

const tabs = [
  {
    key: 'university',
    tab: 'ВУЗам',
    component: UniversityRegisterForm,
  },
  {
    key: 'student',
    tab: 'Студентам',
    component: StudentRegisterForm,
  },
  {
    key: 'company',
    tab: 'Предприятиям',
    component: CompanyRegisterForm,
  },
];

const route = useRoute();
const router = useRouter();

const key = ref(route.params.key);

watch(key, (key) => {
  router.push(`/register/${key}`);
});
</script>

<template>
  <Container>
    <a-tabs
      v-model:active-key="key"
      centered
    >
      <a-tab-pane
        v-for="tab in tabs"
        :key="tab.key"
        :tab="tab.tab"
      >
        <component :is="tab.component" />
      </a-tab-pane>
    </a-tabs>
  </Container>
</template>
