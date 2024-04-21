<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Flex, Form, FormItem, Input, InputPassword } from 'ant-design-vue';
import BaseContainer from '@/components/base/BaseContainer.vue';
import { useAuthStore } from '@/store/auth';

interface FormState {
  email: string;
  password: string;
}

const router = useRouter();
const authStore = useAuthStore();

const formState = reactive<FormState>({
  email: '',
  password: '',
});

const onFinish = async (values: FormState) => {
  await authStore.login(values);
  router.push('/');
};
</script>

<template>
  <BaseContainer :width="400">
    <Form
      :model="formState"
      autocomplete="off"
      layout="vertical"
      @finish="onFinish"
    >
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
            message: 'Пожалуйста введите пароль!',
          },
        ]"
      >
        <InputPassword
          v-model:value="formState.password"
          placeholder="Введите пароль"
        />
      </FormItem>

      <Flex justify="center">
        <FormItem>
          <Button
            :loading="authStore.isLoading"
            type="primary"
            html-type="submit"
          >
            Войти
          </Button>
        </FormItem>
      </Flex>
    </Form>
  </BaseContainer>
</template>
