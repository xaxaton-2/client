<script setup lang="ts">
import { reactive, ref } from 'vue';
import { UploadFile } from 'ant-design-vue';
import { FormInstance } from 'ant-design-vue/es/form';
import { validatePass, validatePass2 } from '@/utils/validation';

interface FormState {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  image: UploadFile | null;
}

const formState = reactive<FormState>({
  email: '',
  password: '',
  repeatPassword: '',
  name: '',
  image: null,
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
      <a-col :span="12">
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

      <a-col :span="12">
        <a-form-item
          label="Наименование"
          name="name"
          :rules="[{ required: true, message: 'Пожалуйста введите наименование!' }]"
        >
          <a-input
            v-model:value="formState.name"
            placeholder="Введите наименование"
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
