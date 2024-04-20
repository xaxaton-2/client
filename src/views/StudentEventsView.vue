<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CalendarOutlined } from '@ant-design/icons-vue';
import { Button, Card, Flex, Space, Tag, Typography, message } from 'ant-design-vue';
import dayjs from 'dayjs';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useEventsStore } from '@/store/events';

const eventsStore = useEventsStore();

const requested = ref<number[]>([]);

const onRequest = (id: number) => {
  message.success('Заявка на мероприятие отправлена');
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
    <Card
      v-for="event in eventsStore.events"
      :key="event.id"
    >
      <Flex vertical>
        <Flex
          align="center"
          justify="space-between"
        >
          <Space>
            <Typography>{{ event.name }}</Typography>
            <Tag color="blue">{{ eventsStore.eventTypesMap[event.eventTypeId].name }}</Tag>
          </Space>

          <Button
            :disabled="requested.includes(event.id)"
            type="primary"
            @click="onRequest(event.id)"
          >
            {{ requested.includes(event.id) ? 'Заявка отправлена' : 'Принять участие' }}
          </Button>
        </Flex>

        <Space :size="4">
          <CalendarOutlined />
          <Typography>{{ dayjs(event.date).format('DD.MM.YYYY') }}</Typography>
        </Space>
      </Flex>
    </Card>
  </Flex>
</template>
