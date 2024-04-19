<script setup lang="ts">
import Container from '@/components/base/Container.vue';
</script>

<template>
  <Container>
    <a-space
      align="center"
      size="large"
    >
      <img
        src="@/assets/images/logo.png"
        alt="Логотип"
      />

      <a-space
        direction="vertical"
        size="large"
      >
        <a-typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ipsam sint eius atque,
          quibusdam vel suscipit, quod doloremque culpa voluptatem sequi iusto iste fuga distinctio
          voluptas accusamus quia! Laborum, quaerat.
        </a-typography>

        <a-flex
          justify="center"
          gap="large"
        >
          <router-link to="/register/university">
            <a-button type="primary">ВУЗам</a-button>
          </router-link>

          <router-link to="/register/student">
            <a-button type="primary">Студентам</a-button>
          </router-link>

          <router-link to="/register/company">
            <a-button type="primary">Предприятиям</a-button>
          </router-link>
        </a-flex>
      </a-space>
    </a-space>
  </Container>
</template>
