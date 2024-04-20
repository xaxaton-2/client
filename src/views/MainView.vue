<script setup lang="ts">
import { StarFilled } from '@ant-design/icons-vue';
import { Avatar, Button, Card, Flex, Space, Typography } from 'ant-design-vue';
import BaseContainer from '@/components/base/BaseContainer.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useStudentsStore } from '@/store/students';

const studentsStore = useStudentsStore();
</script>

<template>
  <BaseContainer>
    <Flex
      gap="large"
      vertical
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

      <BaseSkeleton v-if="studentsStore.isLoading" />

      <Card v-else>
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
            <RouterLink
              v-for="m in 5"
              :key="m"
              class="student"
              :to="`/students/${studentsStore.students[m * n - 1].id}`"
            >
              <Flex
                align="center"
                gap="small"
                vertical
              >
                <Avatar
                  :src="studentsStore.students[m * n - 1].image"
                  size="large"
                />

                <div class="name">
                  <div>
                    {{ studentsStore.students[m * n - 1].name }}
                    {{ studentsStore.students[m * n - 1].surname }}
                  </div>

                  <div>{{ studentsStore.students[m * n - 1].patronymic }}</div>
                </div>
              </Flex>
            </RouterLink>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  </BaseContainer>
</template>

<style scoped lang="scss">
.star {
  font-size: 36px;
  color: $primary;
}

.student {
  width: 20%;
}

.name {
  text-align: center;
}
</style>
