<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Button, Flex, message } from 'ant-design-vue';
import BaseEvent from '@/components/base/BaseEvent.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useEventsStore } from '@/store/events';

const eventsStore = useEventsStore();

const requested = ref<number[]>([]);

const onRequest = (id: number) => {
  message.success('Заявка на мероприятие отправлена!');
  requested.value.push(id);
  console.log(id);
};

onMounted(async () => {
  await eventsStore.getEvents();
});
</script>

<template>
  <BaseSkeleton
    v-if="eventsStore.isLoading"
    :count="3"
  />

  <Flex
    v-else
    gap="middle"
    vertical
  >
    <BaseEvent
      v-for="event in eventsStore.events"
      :key="event.id"
      :event="event"
    >
      <template #actions>
        <Button
          :disabled="requested.includes(event.id)"
          type="primary"
          @click="onRequest(event.id)"
        >
          {{ requested.includes(event.id) ? 'Заявка отправлена' : 'Принять участие' }}
        </Button>
      </template>
    </BaseEvent>
  </Flex>
</template>
