<script setup lang="ts">
import { useRoute } from 'vue-router';
import { StarFilled, UserOutlined } from '@ant-design/icons-vue';
import { Alert, Avatar, Card, Flex, Space, TypographyTitle, AlertProps } from 'ant-design-vue';
import { OhVueIcon } from 'oh-vue-icons';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useStudent } from '@/composables/student';
import { useStudentsStore } from '@/store/students';
import { getFullName } from '@/utils/strings';

const achievements = [
  {
    alert: { type: 'info' },
    icon: {
      name: 'md-science',
      fill: '#3398db',
    },
    label: 'Наука',
    score: 4,
  },
  {
    alert: { type: 'error' },
    icon: {
      name: 'md-sportsbasketball',
      fill: '#eb4c42',
    },
    label: 'Спорт',
    score: 5,
  },
  {
    alert: { type: 'warning' },
    icon: {
      name: 'bi-easel2-fill',
      fill: '#f4ca16',
    },
    label: 'Творчество',
    score: 3,
  },
  {
    alert: { type: 'success' },
    icon: {
      name: 'md-volunteeractivism',
      fill: '#50c878',
    },
    label: 'Волонтерство',
    score: 3,
  },
];

const route = useRoute();
const studentsStore = useStudentsStore();
const { student, group, department, faculty, university } = useStudent(Number(route.params.id));
</script>

<template>
  <BaseSkeleton v-if="studentsStore.isLoading" />

  <Card v-else-if="student">
    <Flex
      gap="large"
      vertical
    >
      <Flex
        class="header"
        align="center"
        gap="large"
      >
        <Avatar
          :src="student.image || undefined"
          :size="96"
          class="avatar"
        >
          <template
            v-if="!student.image"
            #icon
          >
            <UserOutlined />
          </template>
        </Avatar>

        <TypographyTitle :level="3">
          <div>
            {{ getFullName(student) }}
          </div>

          <div>
            {{ university.name }}
            {{ group.name }}
            {{ group.course }} курс
          </div>
        </TypographyTitle>

        <Flex
          align="center"
          class="rating"
          vertical
        >
          <StarFilled />
          <TypographyTitle :level="4">{{ student.score }}</TypographyTitle>
        </Flex>
      </Flex>

      <Flex
        gap="small"
        vertical
      >
        <Alert
          class="alert"
          :message="faculty.name"
          :description="department.name"
          type="info"
        />
      </Flex>

      <Flex justify="space-between">
        <Alert
          v-for="achievement in achievements"
          :key="achievement.label"
          :type="achievement.alert.type as AlertProps['type']"
        >
          <template #message>
            <Flex
              align="center"
              vertical
            >
              <Space>
                <OhVueIcon v-bind="achievement.icon" />
                {{ achievement.label }}
              </Space>

              <div><StarFilled class="star" /> {{ achievement.score }}</div>
            </Flex>
          </template>
        </Alert>
      </Flex>
    </Flex>
  </Card>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  flex-direction: column;
}

.avatar {
  flex-shrink: 0;
}

.rating {
  margin-left: auto;

  .anticon {
    font-size: 36px;
    color: $primary;
  }
}

.star {
  color: $primary;
}

.alert {
  padding: 12px 16px;
}
</style>
