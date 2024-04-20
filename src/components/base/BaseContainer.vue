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
  padding: 0 24px;
  margin: 0 auto;
}
</style>
