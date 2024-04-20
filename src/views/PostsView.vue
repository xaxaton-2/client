<script setup lang="ts">
import { onMounted } from 'vue';
import { Flex } from 'ant-design-vue';
import BaseContainer from '@/components/base/BaseContainer.vue';
import BasePost from '@/components/base/BasePost.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { usePostsStore } from '@/store/posts';

const postsStore = usePostsStore();

onMounted(async () => {
  await postsStore.getPosts();
});
</script>

<template>
  <BaseContainer :width="600">
    <BaseSkeleton
      v-if="postsStore.isLoading"
      :count="3"
    />

    <Flex
      v-else
      gap="large"
      vertical
    >
      <BasePost
        v-for="post in postsStore.posts"
        :key="post.id"
        :post="post"
      />
    </Flex>
  </BaseContainer>
</template>
