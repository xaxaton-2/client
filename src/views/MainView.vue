<script setup lang="ts">
import { StarFilled, UserOutlined } from '@ant-design/icons-vue';
import { Avatar, Button, Card, Flex, Space, Typography } from 'ant-design-vue';
import Container from '@/components/base/Container.vue';
</script>

<template>
  <Container>
    <Space
      direction="vertical"
      size="large"
    >
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ipsam sint eius
              atque, quibusdam vel suscipit, quod doloremque culpa voluptatem sequi iusto iste fuga
              distinctio voluptas accusamus quia! Laborum, quaerat.
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

      <Card>
        <Flex
          justify="center"
          gap="large"
          vertical
        >
          <Flex
            justify="center"
            align="center"
            gap="middle"
          >
            <StarFilled class="star" />
            <Typography>Топ студентов</Typography>
          </Flex>

          <Flex
            v-for="n in 2"
            :key="n"
            justify="center"
            align="center"
            gap="middle"
          >
            <Flex
              v-for="m in 5"
              :key="m"
              align="center"
              gap="small"
              vertical
            >
              <Avatar :size="36">
                <template #icon>
                  <UserOutlined />
                </template>
              </Avatar>

              <Typography>Иванов И. И.</Typography>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Space>
  </Container>
</template>

<style scoped lang="scss">
.star {
  font-size: 36px;
  color: $primary;
}
</style>
