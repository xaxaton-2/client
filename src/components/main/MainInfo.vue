<script setup lang="ts">
import { Button, Card, Flex, Space, Typography } from 'ant-design-vue';
</script>

<template>
  <Card>
    <Space
      align="center"
      size="large"
    >
      <img
        src="@/assets/images/logo.png"
        alt="Логотип"
      />

      <Space
        direction="vertical"
        size="large"
      >
        <Typography>
          <b>LifeCourse</b> - это инновационный сервис, который значительно упрощает процесс
          обучения студентов, предоставляя им возможность эффективного взаимодействия и развития.
          Наши партнеры - это вузы и предприятия, которые ценят инновационные подходы к образованию
          и карьерному развитию своих студентов.
        </Typography>

        <Flex
          justify="center"
          gap="large"
        >
          <router-link to="/register/university">
            <Button type="primary">ВУЗам</Button>
          </router-link>

          <router-link to="/register/student">
            <Button type="primary">Студентам</Button>
          </router-link>

          <router-link to="/register/company">
            <Button type="primary">Предприятиям</Button>
          </router-link>
        </Flex>
      </Space>
    </Space>
  </Card>
</template>
