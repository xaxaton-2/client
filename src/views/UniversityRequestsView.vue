<script setup lang="ts">
import { h, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { Button, Card, Flex, Space, Typography, message } from 'ant-design-vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useEventsStore } from '@/store/events';
import { useRequestsStore } from '@/store/requests';
import { useStudentsStore } from '@/store/students';
import { getFullName } from '@/utils/strings';

const route = useRoute();
const requestsStore = useRequestsStore();
const studentsStore = useStudentsStore();
const eventsStore = useEventsStore();

const removeRequest = (id: number) => {
  requestsStore.requests = requestsStore.requests.filter((request) => request.id !== id);
};

const onAccept = (id: number) => {
  removeRequest(id);
  message.success('Заявка принята!');
};

const onReject = (id: number) => {
  removeRequest(id);
  message.success('Заявка отклонена!');
};

onMounted(async () => {
  await Promise.all([requestsStore.getRequests(), eventsStore.getEvents()]);
});
</script>

<template>
  <BaseSkeleton
    v-if="requestsStore.isLoading || eventsStore.isLoading"
    :count="3"
  />

  <Flex
    v-else
    gap="middle"
    vertical
  >
    <Card
      v-for="request in requestsStore.requests"
      :key="request.id"
    >
      <Flex
        gap="small"
        vertical
      >
        <Typography>
          Заявка от
          <RouterLink :to="`/students/${request.studentId}`">
            {{ getFullName(studentsStore.studentsMap[request.studentId]) }}
          </RouterLink>
          на мероприятие
          <RouterLink :to="`/universities/${route.params.id}/events`">
            {{ eventsStore.eventsMap[request.eventId].name }}
          </RouterLink>
        </Typography>

        <Space>
          <Button
            :icon="h(CheckOutlined)"
            class="accept"
            type="primary"
            @click="onAccept(request.id)"
          >
            Принять
          </Button>

          <Button
            :icon="h(CloseOutlined)"
            type="primary"
            danger
            @click="onReject(request.id)"
          >
            Отклонить
          </Button>
        </Space>
      </Flex>
    </Card>
  </Flex>
</template>

<style scoped lang="scss">
.accept {
  background-color: $blue;

  &:hover {
    background-color: $blue-2;
  }
}
</style>
