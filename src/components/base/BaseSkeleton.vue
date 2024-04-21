<script setup lang="ts">
import { Card, Flex, Skeleton } from 'ant-design-vue';

interface Props {
  count?: number;
}

withDefaults(defineProps<Props>(), {
  count: 1,
});
</script>

<template>
  <Flex
    gap="large"
    vertical
  >
    <Card
      v-for="n in count"
      :key="n"
    >
      <Skeleton
        avatar
        active
      />
    </Card>
  </Flex>
</template>
