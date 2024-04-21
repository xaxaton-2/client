<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  Form,
  FormItem,
  Input,
  Button,
  FormInstance,
  Select,
  SelectOption,
  InputNumber,
} from 'ant-design-vue';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';

interface FormState {
  name: string;
  facultyId?: number;
  departmentId?: number;
  course?: number;
}

const emit = defineEmits<{
  (e: 'finish'): void;
}>();

const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();
const groupsStore = useGroupsStore();

const formRef = ref<FormInstance | null>(null);

const formState = reactive<FormState>({
  name: '',
  facultyId: undefined,
  departmentId: undefined,
  course: undefined,
});

const onFinish = async (values: FormState) => {
  if (!values.course || !values.departmentId || !formRef.value) return;
  await groupsStore.createGroup({
    name: values.name,
    course: values.course,
    department_id: values.departmentId,
  });
  formRef.value.resetFields();
  emit('finish');
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
    <FormItem
      label="Название"
      name="name"
      :rules="[{ required: true, message: 'Пожалуйста введите название!' }]"
    >
      <Input
        v-model:value="formState.name"
        placeholder="Введите название"
      />
    </FormItem>

    <FormItem
      label="Факультет"
      name="facultyId"
      :rules="[{ required: true, message: 'Пожалуйста выберите факультет!' }]"
    >
      <Select
        v-model:value="formState.facultyId"
        :loading="facultiesStore.isLoading"
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
      label="Кафедра"
      name="departmentId"
      :rules="[{ required: true, message: 'Пожалуйста выберите кафедру!' }]"
    >
      <Select
        v-model:value="formState.departmentId"
        :loading="departmentsStore.isLoading"
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
      label="Курс"
      name="course"
      :rules="[{ required: true, message: 'Пожалуйста введите курс!' }]"
    >
      <InputNumber
        v-model:value="formState.course"
        :min="1"
        :max="10"
        class="input"
        placeholder="Введите курс"
      />
    </FormItem>

    <FormItem>
      <Button
        type="primary"
        html-type="submit"
        block
      >
        Создать
      </Button>
    </FormItem>
  </Form>
</template>

<style scoped lang="scss">
.input {
  width: 100%;
}
</style>
