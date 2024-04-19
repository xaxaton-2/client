<script setup lang="ts">
import { Flex } from 'ant-design-vue';
</script>

<template>
  <header class="header">
    <Flex gap="large">
      <router-link to="/">LifeCourse</router-link>
      <router-link to="/posts">Лента новостей</router-link>
      <router-link
        class="login"
        to="/login"
      >
        Вход
      </router-link>
      <router-link to="/register">Регистрация</router-link>
    </Flex>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 16px;
  margin-bottom: 24px;
  color: $white;
  background-color: $primary;

  a {
    color: inherit;
  }
}

.login {
  margin-left: auto;
}
</style>
