<script setup lang="ts">
import { Layout, LayoutContent } from 'ant-design-vue';
import BaseFooter from '@/components/base/BaseFooter.vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
</script>

<template>
  <Layout>
    <BaseHeader />

    <LayoutContent class="content">
      <RouterView />
    </LayoutContent>

    <BaseFooter />
  </Layout>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  padding: 24px 0;
}
</style>
