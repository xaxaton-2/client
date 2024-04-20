<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { StarFilled } from '@ant-design/icons-vue';
import { Alert, Avatar, Card, Flex, Space, TypographyTitle, AlertProps } from 'ant-design-vue';
import { OhVueIcon } from 'oh-vue-icons';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { useStudentsStore } from '@/store/students';
import { useUniversitiesStore } from '@/store/universities';
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
const router = useRouter();
const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();
const studentsStore = useStudentsStore();

const student = computed(() => {
  const id = Number(route.params.id);
  return studentsStore.studentsMap[id];
});

const group = computed(() => groupsStore.groupsMap[student.value.groupId]);

const department = computed(() => departmentsStore.departmentsMap[group.value.departmentId]);

const faculty = computed(() => facultiesStore.facultiesMap[department.value.facultyId]);

const university = computed(() => universitiesStore.universitiesMap[faculty.value.universityId]);

watch(
  [student, () => studentsStore.isLoading],
  ([student, isLoading]) => {
    if (!student && !isLoading) {
      router.push('/');
    }
  },
  { immediate: true },
);
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
          :src="student.image"
          :size="96"
          class="avatar"
        />

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
