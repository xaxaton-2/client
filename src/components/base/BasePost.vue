<script setup lang="ts">
import { LikeFilled, CalendarOutlined } from '@ant-design/icons-vue';
import { Avatar, Card, Comment, Flex, Space, Tag, Tooltip, Typography } from 'ant-design-vue';
import dayjs from 'dayjs';
import { useStudentsStore } from '@/store/students';
import { Post } from '@/types/posts';
import { getFullName } from '@/utils/strings';

defineProps<{
  post: Post;
}>();

const colors = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];

const studentsStore = useStudentsStore();
</script>

<template>
  <Card class="post">
    <Comment>
      <template #actions>
        <Space>
          <Tooltip title="Нравится">
            <LikeFilled />
          </Tooltip>

          <Typography>{{ post.likes }}</Typography>
        </Space>

        <Space
          v-if="post.event"
          :size="2"
        >
          <CalendarOutlined />
          <Typography>{{ post.event.name }}</Typography>
        </Space>
      </template>

      <template #author>
        <RouterLink :to="`/students/${post.studentId}`">
          {{ getFullName(studentsStore.studentsMap[post.studentId]) }}
        </RouterLink>
      </template>

      <template #avatar>
        <RouterLink :to="`/students/${post.studentId}`">
          <Avatar :src="studentsStore.studentsMap[post.studentId].image" />
        </RouterLink>
      </template>

      <template #content>
        <Flex
          gap="small"
          vertical
        >
          <Typography>{{ post.text }}</Typography>

          <img
            v-if="post.image"
            :src="post.image"
          />

          <Flex
            wrap="wrap"
            gap="small"
          >
            <Tag
              v-for="(tag, index) in post.hashtags.split(',')"
              :key="index"
              :color="colors[index % colors.length]"
              class="tag"
            >
              #{{ tag }}
            </Tag>
          </Flex>
        </Flex>
      </template>

      <template #datetime>
        <Tooltip :title="dayjs(post.date).format('DD MMM в HH:mm')">
          <span>{{ dayjs(post.date).fromNow() }}</span>
        </Tooltip>
      </template>
    </Comment>
  </Card>
</template>

<style scoped lang="scss">
.post {
  :deep(.ant-comment-inner) {
    padding: 0;
  }

  :deep(.ant-comment-actions) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.tag {
  margin: 0;
}
</style>
