<script setup lang="ts">
interface Props {
  width?: number;
}

withDefaults(defineProps<Props>(), { width: 1000 });
</script>

<template>
  <div
    class="container"
    :style="{ maxWidth: `${width}px` }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
