<script setup lang="ts">
import { h, onMounted, reactive } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { Button, Col, Flex, Input, Row, Select, SelectOption } from 'ant-design-vue';
import BaseContainer from '@/components/base/BaseContainer.vue';
import BasePost from '@/components/base/BasePost.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useDepartmentsStore } from '@/store/departments';
import { useEventsStore } from '@/store/events';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { usePostsStore } from '@/store/posts';
import { useUniversitiesStore } from '@/store/universities';

interface FormState {
  text: string;
  city: string;
  universityId?: number;
  facultyId?: number;
  departmentId?: number;
  groupId?: number;
  eventTypeId?: number;
}

const postsStore = usePostsStore();
const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();
const eventsStore = useEventsStore();

const formState = reactive<FormState>({
  text: '',
  city: '',
  universityId: undefined,
  facultyId: undefined,
  departmentId: undefined,
  groupId: undefined,
  eventTypeId: undefined,
});

onMounted(async () => {
  await postsStore.getPosts();
});
</script>

<template>
  <BaseContainer :width="600">
    <BaseSkeleton
      v-if="postsStore.isLoading"
      :count="3"
    />

    <Flex
      v-else
      gap="large"
      vertical
    >
      <Row :gutter="[24, 24]">
        <Col :span="12">
          <Input
            v-model:value="formState.text"
            placeholder="Поиск"
            allow-clear
          >
            <template #suffix>
              <SearchOutlined />
            </template>
          </Input>
        </Col>

        <Col :span="12">
          <Input
            v-model:value="formState.city"
            placeholder="Введите город"
            allow-clear
          />
        </Col>

        <Col :span="12">
          <Select
            v-model:value="formState.universityId"
            :loading="universitiesStore.isLoading"
            class="select"
            placeholder="Выберите университет"
            allow-clear
          >
            <SelectOption
              v-for="university in universitiesStore.universities"
              :key="university.id"
              :value="university.id"
            >
              {{ university.name }}
            </SelectOption>
          </Select>
        </Col>

        <Col :span="12">
          <Select
            v-model:value="formState.facultyId"
            :loading="facultiesStore.isLoading"
            class="select"
            placeholder="Выберите факультет"
            allow-clear
          >
            <SelectOption
              v-for="faculty in facultiesStore.faculties"
              :key="faculty.id"
              :value="faculty.id"
            >
              {{ faculty.name }}
            </SelectOption>
          </Select>
        </Col>

        <Col :span="12">
          <Select
            v-model:value="formState.departmentId"
            :loading="departmentsStore.isLoading"
            class="select"
            placeholder="Выберите кафедру"
            allow-clear
          >
            <SelectOption
              v-for="department in departmentsStore.departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </SelectOption>
          </Select>
        </Col>

        <Col :span="12">
          <Select
            v-model:value="formState.groupId"
            :loading="groupsStore.isLoading"
            class="select"
            placeholder="Выберите группу"
            allow-clear
          >
            <SelectOption
              v-for="group in groupsStore.groups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
            </SelectOption>
          </Select>
        </Col>

        <Col :span="12">
          <Select
            v-model:value="formState.eventTypeId"
            :loading="eventsStore.isLoading"
            class="select"
            placeholder="Выберите тип мероприятия"
            allow-clear
          >
            <SelectOption
              v-for="eventType in Object.values(eventsStore.eventTypesMap)"
              :key="eventType.id"
              :value="eventType.id"
            >
              {{ eventType.name }}
            </SelectOption>
          </Select>
        </Col>

        <Col :span="12">
          <Button
            :icon="h(SearchOutlined)"
            type="primary"
            block
          >
            Поиск
          </Button>
        </Col>
      </Row>

      <BasePost
        v-for="post in postsStore.posts"
        :key="post.id"
        :post="post"
      />
    </Flex>
  </BaseContainer>
</template>

<style scoped>
.select {
  width: 100%;
}
</style>
