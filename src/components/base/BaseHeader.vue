<script setup lang="ts">
import { computed } from 'vue';
import { Flex, LayoutHeader } from 'ant-design-vue';
import { useAuthStore } from '@/store/auth';
import { Role } from '@/types/auth';
import { getFullName } from '@/utils/strings';

const authStore = useAuthStore();

const name = computed(() => {
  if (!authStore.isAuth || !authStore.data) return null;

  if (authStore.data?.user.role === Role.Student) {
    return getFullName(authStore.data.student!);
  } else if (authStore.data.user.role === Role.University) {
    return authStore.data.university?.name || null;
  } else if (authStore.data.user.role === Role.Company) {
    return authStore.data.company?.name || null;
  }

  return null;
});

const profile = computed(() => {
  if (!authStore.isAuth) return null;

  if (authStore.data?.user.role === Role.Student && authStore.data.student) {
    return `/students/${authStore.data.student.id}`;
  } else if (authStore.data?.user.role === Role.University && authStore.data.university) {
    return `/universities/${authStore.data.university.id}`;
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

        <template v-else>
          <span>{{ name }}</span>

          <router-link
            v-if="profile"
            :to="profile"
          >
            Профиль
          </router-link>

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
