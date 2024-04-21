<script setup lang="ts">
import { computed } from 'vue';
import { LikeFilled, CalendarOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Avatar, Card, Comment, Flex, Space, Tag, Tooltip, Typography } from 'ant-design-vue';
import dayjs from 'dayjs';
import { useStudentsStore } from '@/store/students';
import { Post } from '@/types/posts';
import { getFullName } from '@/utils/strings';

const props = defineProps<{
  post: Post;
}>();

const colors = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];

const studentsStore = useStudentsStore();

const student = computed(() => studentsStore.studentsMap[props.post.studentId]);

const tags = computed(() => (props.post.hashtags ? props.post.hashtags.split(',') : []));
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
          {{ getFullName(student) }}
        </RouterLink>
      </template>

      <template #avatar>
        <RouterLink :to="`/students/${post.studentId}`">
          <Avatar :src="student.image || undefined">
            <template
              v-if="!student.image"
              #icon
            >
              <UserOutlined />
            </template>
          </Avatar>
        </RouterLink>
      </template>

      <template #content>
        <Flex
          gap="small"
          vertical
        >
          <p>{{ post.text }}</p>

          <img
            v-if="post.image"
            :src="post.image"
          />

          <Flex
            wrap="wrap"
            gap="small"
          >
            <Tag
              v-for="(tag, index) in tags"
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
        <Tooltip :title="dayjs(post.date).format('D MMM в HH:mm')">
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
