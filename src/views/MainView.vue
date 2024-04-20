<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import BaseContainer from '@/components/base/BaseContainer.vue';
import MainInfo from '@/components/main/MainInfo.vue';
import TopStudents from '@/components/students/TopStudents.vue';
</script>

<template>
  <BaseContainer>
    <Flex
      gap="large"
      vertical
    >
      <MainInfo />
      <TopStudents />
    </Flex>
  </BaseContainer>
</template>
