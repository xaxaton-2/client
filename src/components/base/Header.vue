<template>
  <header class="header">
    <a-flex gap="large">
      <router-link to="/">LifeCourse</router-link>
      <router-link to="/posts">Лента новостей</router-link>
      <router-link
        class="login"
        to="/login"
      >
        Вход
      </router-link>
      <router-link to="/register">Регистрация</router-link>
    </a-flex>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 16px;
  color: $white;
  background-color: $primary;
  margin-bottom: 24px;

  a {
    color: inherit;
  }
}

.login {
  margin-left: auto;
}
</style>
