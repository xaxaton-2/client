<script setup lang="ts">
import { ref, h, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
import { Button, Drawer, Flex } from 'ant-design-vue';
import BasePost from '@/components/base/BasePost.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import NewPostForm from '@/components/posts/NewPostForm.vue';
import { useAuthStore } from '@/store/auth';
import { useEventsStore } from '@/store/events';
import { usePostsStore } from '@/store/posts';

const route = useRoute();
const authStore = useAuthStore();
const postsStore = usePostsStore();
const eventsStore = useEventsStore();

const isDrawerOpen = ref(false);

const id = computed(() => Number(route.params.id));

onMounted(async () => {
  await Promise.all([postsStore.getPosts(), eventsStore.getEvents()]);
});
</script>

<template>
  <BaseSkeleton
    v-if="postsStore.isLoading"
    :count="3"
  />

  <Flex
    v-else
    gap="large"
    vertical
  >
    <Button
      v-if="authStore.data?.student?.id === id"
      type="primary"
      :icon="h(PlusOutlined)"
      @click="isDrawerOpen = true"
    >
      Новая публикация
    </Button>

    <BasePost
      v-for="post in postsStore.posts"
      :key="post.id"
      :post="post"
    />
  </Flex>

  <Drawer
    v-if="authStore.data?.student?.id === id"
    v-model:open="isDrawerOpen"
    title="Новая публикация"
    placement="right"
  >
    <NewPostForm @finish="isDrawerOpen = false" />
  </Drawer>
</template>
