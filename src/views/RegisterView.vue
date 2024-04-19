<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TabPane, Tabs } from 'ant-design-vue';
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

const key = ref(route.params.key.toString());
</script>

<template>
  <Container>
    <Tabs
      v-model:active-key="key"
      centered
      @change="router.push(`/register/${key}`)"
    >
      <TabPane
        v-for="tab in tabs"
        :key="tab.key"
        :tab="tab.tab"
      >
        <component :is="tab.component" />
      </TabPane>
    </Tabs>
  </Container>
</template>
