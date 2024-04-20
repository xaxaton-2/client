<script setup lang="ts">
import { Flex, LayoutHeader } from 'ant-design-vue';
</script>

<template>
  <LayoutHeader class="header">
    <Flex gap="large">
      <router-link to="/">LifeCourse</router-link>
      <router-link to="/posts">Лента новостей</router-link>
      <router-link to="/universities">Университеты</router-link>
      <router-link
        class="login"
        to="/login"
      >
        Вход
      </router-link>
      <router-link to="/register">Регистрация</router-link>
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

.login {
  margin-left: auto;
}
</style>
