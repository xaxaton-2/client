<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import {
  Form,
  FormItem,
  Input,
  Button,
  DatePicker,
  Select,
  SelectOption,
  FormInstance,
} from 'ant-design-vue';
import { Dayjs } from 'dayjs';
import { useEventsStore } from '@/store/events';

interface FormState {
  name: string;
  date?: Dayjs;
  eventTypeId?: number;
}

const emit = defineEmits<{
  (e: 'finish'): void;
}>();

const route = useRoute();
const eventsStore = useEventsStore();

const formRef = ref<FormInstance | null>(null);

const formState = reactive<FormState>({
  name: '',
  date: undefined,
  eventTypeId: undefined,
});

const onFinish = (values: FormState) => {
  if (!values.date || !values.eventTypeId || !formRef.value) return;
  eventsStore.events.unshift({
    id: Date.now(),
    name: values.name,
    date: values.date?.toString(),
    eventTypeId: values.eventTypeId,
    universityId: Number(route.params.id),
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
      label="Дата"
      name="date"
      :rules="[{ required: true, message: 'Пожалуйста выберите дату!' }]"
    >
      <DatePicker
        v-model:value="formState.date"
        class="date"
        format="DD.MM.YYYY"
      />
    </FormItem>

    <FormItem
      label="Тип мероприятия"
      name="eventTypeId"
      :rules="[{ required: true, message: 'Пожалуйста выберите тип мероприятия!' }]"
    >
      <Select
        v-model:value="formState.eventTypeId"
        :loading="eventsStore.isLoading"
        class="select"
        placeholder="Выберите тип мероприятия"
      >
        <SelectOption
          v-for="eventType in Object.values(eventsStore.eventTypesMap)"
          :key="eventType.id"
          :value="eventType.id"
        >
          {{ eventType.name }}
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

<style scoped lang="scss">
.date {
  width: 100%;
}
</style>
