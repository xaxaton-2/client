<script setup lang="ts">
import { ref, h, onMounted } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { Button, Drawer, Flex } from 'ant-design-vue';
import BaseEvent from '@/components/base/BaseEvent.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import NewEventForm from '@/components/events/NewEventForm.vue';
import { useEventsStore } from '@/store/events';

const eventsStore = useEventsStore();

const isDrawerOpen = ref(false);

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
    <Button
      type="primary"
      :icon="h(PlusOutlined)"
      @click="isDrawerOpen = true"
    >
      Новое мероприятие
    </Button>

    <BaseEvent
      v-for="event in eventsStore.events"
      :key="event.id"
      :event="event"
    />
  </Flex>

  <Drawer
    v-model:open="isDrawerOpen"
    title="Новое мероприятие"
    placement="right"
  >
    <NewEventForm @finish="isDrawerOpen = false" />
  </Drawer>
</template>
