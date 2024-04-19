<script setup lang="ts">
import { reactive, ref } from 'vue';
import { UploadFile } from 'ant-design-vue';
import { FormInstance } from 'ant-design-vue/es/form';
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
  image: UploadFile | null;
  universityId: number | null;
  facultyId: number | null;
  departmentId: number | null;
  groupId: number | null;
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
  image: null,
  universityId: null,
  facultyId: null,
  departmentId: null,
  groupId: null,
});

const formRef = ref<FormInstance | null>(null);

const onFinish = (values: FormState) => {
  console.log(values);
};
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    autocomplete="off"
    layout="vertical"
    @finish="onFinish"
  >
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Пожалуйста введите email!' },
            { type: 'email', message: 'Некорректный email!' },
          ]"
        >
          <a-input
            v-model:value="formState.email"
            placeholder="Введите email"
          />
        </a-form-item>

        <a-form-item
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
          <a-input
            v-model:value="formState.password"
            placeholder="Введите пароль"
            type="password"
          />
        </a-form-item>

        <a-form-item
          label="Повторите пароль"
          name="repeatPassword"
          :rules="[
            { required: true, validator: validatePass2(formState.password), trigger: 'blur' },
          ]"
        >
          <a-input
            v-model:value="formState.repeatPassword"
            placeholder="Повторите пароль"
            type="password"
          />
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          label="Фамилия"
          name="surname"
          :rules="[{ required: true, message: 'Пожалуйста введите фамилию!' }]"
        >
          <a-input
            v-model:value="formState.surname"
            placeholder="Введите фамилию"
          />
        </a-form-item>

        <a-form-item
          label="Имя"
          name="name"
          :rules="[{ required: true, message: 'Пожалуйста введите имя!' }]"
        >
          <a-input
            v-model:value="formState.name"
            placeholder="Введите имя"
          />
        </a-form-item>

        <a-form-item
          label="Отчество"
          name="patronymic"
        >
          <a-input
            v-model:value="formState.patronymic"
            placeholder="Введите отчество"
          />
        </a-form-item>

        <a-form-item
          label="Фото"
          name="image"
        >
          <a-upload
            v-model:file-list="formState.image"
            name="image"
            accept="image/*"
            :max-count="1"
            :before-upload="() => false"
          >
            <a-button block>Выбрать фото</a-button>
          </a-upload>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          name="universityId"
          label="Университет"
          :rules="[{ required: true, message: 'Пожалуйста выберите университет!' }]"
        >
          <a-select
            v-model:value="formState.universityId"
            :loading="universitiesStore.isLoading"
            placeholder="Выберите университет"
          >
            <a-select-option
              v-for="university in universitiesStore.universities"
              :key="university.id"
              :value="university.id"
            >
              {{ university.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          name="facultyId"
          label="Факультет"
          :rules="[{ required: true, message: 'Пожалуйста выберите факультет!' }]"
        >
          <a-select
            v-model:value="formState.facultyId"
            :loading="facultiesStore.isLoading"
            :disabled="!formState.universityId"
            placeholder="Выберите факультет"
          >
            <a-select-option
              v-for="faculty in facultiesStore.faculties"
              :key="faculty.id"
              :value="faculty.id"
            >
              {{ faculty.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          name="departmentId"
          label="Кафедра"
          :rules="[{ required: true, message: 'Пожалуйста выберите кафедру!' }]"
        >
          <a-select
            v-model:value="formState.departmentId"
            :loading="departmentsStore.isLoading"
            :disabled="!formState.facultyId"
            placeholder="Выберите кафедру"
          >
            <a-select-option
              v-for="department in departmentsStore.departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          name="groupId"
          label="Группа"
          :rules="[{ required: true, message: 'Пожалуйста выберите группу!' }]"
        >
          <a-select
            v-model:value="formState.groupId"
            :loading="groupsStore.isLoading"
            :disabled="!formState.departmentId"
            placeholder="Выберите группу"
          >
            <a-select-option
              v-for="group in groupsStore.groups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
            </a-select-option>
          </a-select>
        </a-form-item></a-col
      >
    </a-row>

    <a-flex justify="center">
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          Зарегистрироваться
        </a-button>
      </a-form-item>
    </a-flex>
  </a-form>
</template>
