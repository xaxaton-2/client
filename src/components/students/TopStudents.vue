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
              :src="studentsStore.students[m * n - 1].image || undefined"
              size="large"
            >
              <template
                v-if="!studentsStore.students[m * n - 1].image"
                #icon
              >
                <UserOutlined />
              </template>
            </Avatar>

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
