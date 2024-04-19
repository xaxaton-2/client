<script setup lang="ts">
import { reactive } from 'vue';
import Container from '@/components/base/Container.vue';

interface FormState {
  email: string;
  password: string;
}

const formState = reactive<FormState>({
  email: '',
  password: '',
});

const onFinish = (values: FormState) => {
  console.log(values);
};
</script>

<template>
  <Container :width="400">
    <a-form
      :model="formState"
      autocomplete="off"
      layout="vertical"
      @finish="onFinish"
    >
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
            message: 'Пожалуйста введите пароль!',
          },
        ]"
      >
        <a-input
          v-model:value="formState.password"
          placeholder="Введите пароль"
          type="password"
        />
      </a-form-item>

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
  </Container>
</template>
