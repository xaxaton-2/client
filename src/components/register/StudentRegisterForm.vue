<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  SelectOption,
  Upload,
  UploadFile,
} from 'ant-design-vue';
import { FormInstance, FormItem } from 'ant-design-vue/es/form';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { useUniversitiesStore } from '@/store/universities';
import { validatePass, validatePass2 } from '@/utils/validation';

interface FormState {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  surname: string;
  patronymic: string;
  image: UploadFile[];
  universityId?: number;
  facultyId?: number;
  departmentId?: number;
  groupId?: number;
}

const universitiesStore = useUniversitiesStore();
const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();

const formState = reactive<FormState>({
  email: '',
  password: '',
  repeatPassword: '',
  name: '',
  surname: '',
  patronymic: '',
  image: [],
  universityId: undefined,
  facultyId: undefined,
  departmentId: undefined,
  groupId: undefined,
});

const formRef = ref<FormInstance | null>(null);

const onFinish = (values: FormState) => {
  console.log(values);
};
</script>

<template>
  <Form
    ref="formRef"
    :model="formState"
    autocomplete="off"
    layout="vertical"
    @finish="onFinish"
  >
    <Row :gutter="24">
      <Col :span="8">
        <FormItem
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Пожалуйста введите email!' },
            { type: 'email', message: 'Некорректный email!' },
          ]"
        >
          <Input
            v-model:value="formState.email"
            placeholder="Введите email"
          />
        </FormItem>

        <FormItem
          label="Пароль"
          name="password"
          :rules="[
            {
              required: true,
              validator: validatePass(formState.repeatPassword, formRef!),
              trigger: 'blur',
            },
          ]"
        >
          <Input
            v-model:value="formState.password"
            placeholder="Введите пароль"
            type="password"
          />
        </FormItem>

        <FormItem
          label="Повторите пароль"
          name="repeatPassword"
          :rules="[
            { required: true, validator: validatePass2(formState.password), trigger: 'blur' },
          ]"
        >
          <Input
            v-model:value="formState.repeatPassword"
            placeholder="Повторите пароль"
            type="password"
          />
        </FormItem>
      </Col>

      <Col :span="8">
        <FormItem
          label="Фамилия"
          name="surname"
          :rules="[{ required: true, message: 'Пожалуйста введите фамилию!' }]"
        >
          <Input
            v-model:value="formState.surname"
            placeholder="Введите фамилию"
          />
        </FormItem>

        <FormItem
          label="Имя"
          name="name"
          :rules="[{ required: true, message: 'Пожалуйста введите имя!' }]"
        >
          <Input
            v-model:value="formState.name"
            placeholder="Введите имя"
          />
        </FormItem>

        <FormItem
          label="Отчество"
          name="patronymic"
        >
          <Input
            v-model:value="formState.patronymic"
            placeholder="Введите отчество"
          />
        </FormItem>

        <FormItem
          label="Фото"
          name="image"
        >
          <Upload
            v-model:file-list="formState.image"
            name="image"
            accept="image/*"
            :max-count="1"
            :before-upload="() => false"
          >
            <Button block>Выбрать фото</Button>
          </Upload>
        </FormItem>
      </Col>

      <Col :span="8">
        <FormItem
          name="universityId"
          label="Университет"
          :rules="[{ required: true, message: 'Пожалуйста выберите университет!' }]"
        >
          <Select
            v-model:value="formState.universityId"
            :loading="universitiesStore.isLoading"
            placeholder="Выберите университет"
          >
            <SelectOption
              v-for="university in universitiesStore.universities"
              :key="university.id"
              :value="university.id"
            >
              {{ university.name }}
            </SelectOption>
          </Select>
        </FormItem>

        <FormItem
          name="facultyId"
          label="Факультет"
          :rules="[{ required: true, message: 'Пожалуйста выберите факультет!' }]"
        >
          <Select
            v-model:value="formState.facultyId"
            :loading="facultiesStore.isLoading"
            :disabled="!formState.universityId"
            placeholder="Выберите факультет"
          >
            <SelectOption
              v-for="faculty in facultiesStore.faculties"
              :key="faculty.id"
              :value="faculty.id"
            >
              {{ faculty.name }}
            </SelectOption>
          </Select>
        </FormItem>

        <FormItem
          name="departmentId"
          label="Кафедра"
          :rules="[{ required: true, message: 'Пожалуйста выберите кафедру!' }]"
        >
          <Select
            v-model:value="formState.departmentId"
            :loading="departmentsStore.isLoading"
            :disabled="!formState.facultyId"
            placeholder="Выберите кафедру"
          >
            <SelectOption
              v-for="department in departmentsStore.departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </SelectOption>
          </Select>
        </FormItem>

        <FormItem
          name="groupId"
          label="Группа"
          :rules="[{ required: true, message: 'Пожалуйста выберите группу!' }]"
        >
          <Select
            v-model:value="formState.groupId"
            :loading="groupsStore.isLoading"
            :disabled="!formState.departmentId"
            placeholder="Выберите группу"
          >
            <SelectOption
              v-for="group in groupsStore.groups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
            </SelectOption>
          </Select>
        </FormItem></Col
      >
    </Row>

    <Flex justify="center">
      <FormItem>
        <Button
          type="primary"
          html-type="submit"
        >
          Зарегистрироваться
        </Button>
      </FormItem>
    </Flex>
  </Form>
</template>
