<script setup lang="ts">
import { reactive, h, onBeforeUnmount } from 'vue';
import { SearchOutlined, StarFilled } from '@ant-design/icons-vue';
import {
  Button,
  Card,
  Col,
  Flex,
  Input,
  InputNumber,
  List,
  ListItem,
  Row,
  Select,
  SelectOption,
  Typography,
} from 'ant-design-vue';
import BaseContainer from '@/components/base/BaseContainer.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { useStudentsStore } from '@/store/students';
import { useUniversitiesStore } from '@/store/universities';
import { StudentsParams } from '@/types/students';
import { getFullName } from '@/utils/strings';
import { filterObject } from '@/utils/structures';

interface FormState {
  city?: string;
  universityId?: number;
  facultyId?: number;
  departmentId?: number;
  course?: number;
}

const studentsStore = useStudentsStore();
const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();

const formState = reactive<FormState>({
  city: '',
  universityId: undefined,
  facultyId: undefined,
  departmentId: undefined,
  course: undefined,
});

const onSearch = async () => {
  const params: StudentsParams = filterObject({
    city: formState.city,
    course: formState.course,
    department_id: formState.departmentId,
    faculty_id: formState.facultyId,
    university_id: formState.universityId,
  });

  await studentsStore.getStudents(params);
};

onBeforeUnmount(async () => {
  await studentsStore.getStudents();
});
</script>

<template>
  <BaseContainer>
    <Row
      v-if="studentsStore.isLoading"
      :gutter="[24, 24]"
    >
      <Col
        v-for="n in 6"
        :key="n"
        :span="8"
      >
        <BaseSkeleton />
      </Col>
    </Row>

    <Flex
      v-else
      gap="large"
      vertical
    >
      <Row :gutter="[24, 24]">
        <Col :span="8">
          <Input
            v-model:value="formState.city"
            placeholder="Введите город"
            allow-clear
          />
        </Col>

        <Col :span="8">
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

        <Col :span="8">
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

        <Col :span="8">
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

        <Col :span="8">
          <InputNumber
            v-model:value="formState.course"
            :min="1"
            :max="10"
            class="input"
            placeholder="Введите курс"
          />
        </Col>

        <Col :span="8">
          <Button
            :loading="studentsStore.isLoading"
            :icon="h(SearchOutlined)"
            type="primary"
            block
            @click="onSearch"
          >
            Поиск
          </Button>
        </Col>
      </Row>

      <List
        :grid="{ column: 3 }"
        :data-source="studentsStore.students"
      >
        <template #renderItem="{ item }">
          <ListItem>
            <Card class="card">
              <Flex
                align="center"
                gap="small"
                vertical
              >
                <Typography>{{ getFullName(item) }}</Typography>
                <Typography>{{ groupsStore.groupsMap[item.groupId]?.name }}</Typography>
                <Typography>{{ groupsStore.groupsMap[item.groupId]?.course }} курс</Typography>
                <Flex
                  align="center"
                  gap="small"
                >
                  <StarFilled class="star" /> {{ item.score }}
                </Flex>
              </Flex>
            </Card>
          </ListItem>
        </template>
      </List>
    </Flex>
  </BaseContainer>
</template>

<style scoped lang="scss">
.select,
.input {
  width: 100%;
}

.card {
  text-align: center;
}

.star {
  color: $primary;
}
</style>
