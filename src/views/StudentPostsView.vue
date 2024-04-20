<script setup lang="ts">
import { onMounted } from 'vue';
import { LikeFilled } from '@ant-design/icons-vue';
import { Avatar, Card, Comment, Flex, Space, Tag, Tooltip, Typography } from 'ant-design-vue';
import dayjs from 'dayjs';
import { usePostsStore } from '@/store/posts';
import { useStudentsStore } from '@/store/students';
import { getFullName } from '@/utils/strings';

const colors = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];

const postsStore = usePostsStore();
const studentsStore = useStudentsStore();

onMounted(async () => {
  await postsStore.getPosts();
});
</script>

<template>
  <Flex
    gap="large"
    vertical
  >
    <Card
      v-for="post in [...postsStore.posts, ...postsStore.posts, ...postsStore.posts]"
      :key="post.id"
      class="post"
    >
      <Comment>
        <template #actions>
          <Space>
            <Tooltip title="Нравится">
              <LikeFilled />
            </Tooltip>

            <Typography>{{ post.likes }}</Typography>
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
  </Flex>
</template>

<style scoped lang="scss">
.post {
  :deep(.ant-comment-inner) {
    padding: 0;
  }
}

.tag {
  margin: 0;
}
</style>
