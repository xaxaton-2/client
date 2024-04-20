<script setup lang="ts">
import { computed } from 'vue';
import { CalendarOutlined } from '@ant-design/icons-vue';
import { Card, Flex, Space, Tag, Typography } from 'ant-design-vue';
import dayjs from 'dayjs';
import { useEventsStore } from '@/store/events';
import { Event } from '@/types/events';

const props = defineProps<{
  event: Event;
}>();

const eventsStore = useEventsStore();

const eventType = computed(() => eventsStore.eventTypesMap[props.event.eventTypeId]);
</script>

<template>
  <Card>
    <Flex vertical>
      <Flex
        align="center"
        justify="space-between"
      >
        <Space>
          <Typography>{{ event.name }}</Typography>
          <Tag color="blue">{{ eventType.name }}</Tag>
        </Space>

        <slot name="actions" />
      </Flex>

      <Space :size="4">
        <CalendarOutlined />
        <Typography>{{ dayjs(event.date).format('DD.MM.YYYY') }}</Typography>
      </Space>
    </Flex>
  </Card>
</template>
