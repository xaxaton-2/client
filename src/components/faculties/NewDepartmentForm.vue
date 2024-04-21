<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form, FormItem, Input, Button, FormInstance, Select, SelectOption } from 'ant-design-vue';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';

interface FormState {
  name: string;
  facultyId?: number;
}

const emit = defineEmits<{
  (e: 'finish'): void;
}>();

const facultiesStore = useFacultiesStore();
const departmentsStore = useDepartmentsStore();

const formRef = ref<FormInstance | null>(null);

const formState = reactive<FormState>({
  name: '',
  facultyId: undefined,
});

const onFinish = async (values: FormState) => {
  if (!values.facultyId || !formRef.value) return;
  await departmentsStore.createDepartment({
    name: values.name,
    faculty_id: values.facultyId,
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
