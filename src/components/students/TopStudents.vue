<script setup lang="ts">
import { StarFilled, UserOutlined } from '@ant-design/icons-vue';
import { Avatar, Card, Flex, Typography } from 'ant-design-vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useStudentsStore } from '@/store/students';

const studentsStore = useStudentsStore();
</script>

<template>
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
        justify="center"
        wrap="wrap"
        gap="large"
      >
        <RouterLink
          v-for="student in studentsStore.students"
          :key="student.id"
          class="student"
          :to="`/students/${student.id}`"
        >
          <Flex
            align="center"
            justify="center"
            gap="small"
            vertical
          >
            <Avatar
              :src="student.image || undefined"
              size="large"
            >
              <template
                v-if="!student.image"
                #icon
              >
                <UserOutlined />
              </template>
            </Avatar>

            <div class="name">
              <div>
                {{ student.name }}
                {{ student.surname }}
              </div>

              <div>{{ student.patronymic }}</div>
            </div>
          </Flex>
        </RouterLink>
      </Flex>
    </Flex>
  </Card>
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
