<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form, FormItem, Input, Button, FormInstance } from 'ant-design-vue';
import { useFacultiesStore } from '@/store/faculties';

interface FormState {
  name: string;
}

const emit = defineEmits<{
  (e: 'finish'): void;
}>();

const facultiesStore = useFacultiesStore();

const formRef = ref<FormInstance | null>(null);

const formState = reactive<FormState>({
  name: '',
});

const onFinish = async (values: FormState) => {
  if (!formRef.value) return;
  await facultiesStore.createFaculty(values.name);
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
