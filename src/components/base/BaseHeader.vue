<script setup lang="ts">
import { computed } from 'vue';
import { Flex, LayoutHeader } from 'ant-design-vue';
import { useAuthStore } from '@/store/auth';
import { Role } from '@/types/auth';

const authStore = useAuthStore();

const profile = computed(() => {
  if (authStore.data?.user.role === Role.Student) {
    return `/students/${authStore.data.student?.id}`;
  } else if (authStore.data?.user.role === Role.University) {
    return `/universities/${authStore.data.university?.id}`;
  }
  return null;
});
</script>

<template>
  <LayoutHeader class="header">
    <Flex justify="space-between">
      <Flex gap="large">
        <router-link to="/">LifeCourse</router-link>

        <router-link to="/posts">Лента новостей</router-link>

        <router-link to="/universities">Университеты</router-link>
      </Flex>

      <Flex gap="large">
        <template v-if="!authStore.isAuth">
          <router-link to="/login">Вход</router-link>

          <router-link to="/register">Регистрация</router-link>
        </template>

        <template v-else-if="profile">
          <router-link :to="profile"> Профиль </router-link>

          <span
            class="logout"
            @click="authStore.logout"
          >
            Выйти
          </span>
        </template>
      </Flex>
    </Flex>
  </LayoutHeader>
</template>

<style scoped lang="scss">
.header {
  height: auto;
  padding: 16px;
  line-height: inherit;
  color: $white;
  background-color: $primary;

  a {
    color: inherit;
  }
}

.logout {
  cursor: pointer;
}
</style>
