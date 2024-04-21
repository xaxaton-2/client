<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import {
  Form,
  FormItem,
  Button,
  Select,
  SelectOption,
  FormInstance,
  Upload,
  UploadFile,
  Textarea,
} from 'ant-design-vue';
import dayjs from 'dayjs';
import { useEventsStore } from '@/store/events';
import { usePostsStore } from '@/store/posts';

interface FormState {
  text: string;
  image: UploadFile[];
  hashtags: string[];
  eventId?: number;
}

const emit = defineEmits<{
  (e: 'finish'): void;
}>();

const route = useRoute();
const eventsStore = useEventsStore();
const postsStore = usePostsStore();

const formRef = ref<FormInstance | null>(null);

const formState = reactive<FormState>({
  text: '',
  image: [],
  hashtags: [],
  eventId: undefined,
});

const onFinish = (values: FormState) => {
  if (!formRef.value) return;
  postsStore.posts.unshift({
    id: Date.now(),
    date: dayjs().toJSON(),
    text: values.text,
    image: null,
    hashtags: values.hashtags.join(','),
    event: values.eventId ? eventsStore.eventsMap[values.eventId] : null,
    studentId: Number(route.params.id),
    likes: 0,
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
      label="Текст"
      name="text"
      :rules="[{ required: true, message: 'Пожалуйста введите текст!' }]"
    >
      <Textarea
        v-model:value="formState.text"
        placeholder="Введите текст"
        auto-size
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

    <FormItem
      label="Хештеги"
      name="hashtags"
    >
      <Select
        v-model:value="formState.hashtags"
        :dropdown-style="{ display: 'none' }"
        placeholder="Введите хештеги"
        mode="tags"
      />
    </FormItem>

    <FormItem
      label="Мероприятие"
      name="eventId"
    >
      <Select
        v-model:value="formState.eventId"
        :loading="eventsStore.isLoading"
        placeholder="Выберите мероприятие"
        allow-clear
      >
        <SelectOption
          v-for="event in eventsStore.events"
          :key="event.id"
          :value="event.id"
        >
          {{ event.name }}
        </SelectOption>
      </Select>
    </FormItem>

    <FormItem>
      <Button
        type="primary"
        html-type="submit"
        block
      >
        Опубликовать
      </Button>
    </FormItem>
  </Form>
</template>
