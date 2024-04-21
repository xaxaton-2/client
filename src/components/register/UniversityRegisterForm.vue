<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputPassword,
  Row,
  Upload,
  UploadFile,
} from 'ant-design-vue';
import { FormInstance, FormItem } from 'ant-design-vue/es/form';
import { useAuthStore } from '@/store/auth';
import { validatePass, validatePass2 } from '@/utils/validation';

interface FormState {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  city: string;
  image: UploadFile[];
}

const router = useRouter();
const authStore = useAuthStore();

const formState = reactive<FormState>({
  email: '',
  password: '',
  repeatPassword: '',
  name: '',
  city: '',
  image: [],
});

const formRef = ref<FormInstance | null>(null);

const onFinish = async (values: FormState) => {
  await authStore.registerUniversity({
    email: values.email,
    password: values.password,
    name: values.name,
    city: values.city,
  });
  router.push('/login');
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
      <Col :span="12">
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
          <InputPassword
            v-model:value="formState.password"
            placeholder="Введите пароль"
          />
        </FormItem>

        <FormItem
          label="Повторите пароль"
          name="repeatPassword"
          :rules="[
            { required: true, validator: validatePass2(formState.password), trigger: 'blur' },
          ]"
        >
          <InputPassword
            v-model:value="formState.repeatPassword"
            placeholder="Повторите пароль"
          />
        </FormItem>
      </Col>

      <Col :span="12">
        <FormItem
          label="Наименование"
          name="name"
          :rules="[{ required: true, message: 'Пожалуйста введите наименование!' }]"
        >
          <Input
            v-model:value="formState.name"
            placeholder="Введите наименование"
          />
        </FormItem>

        <FormItem
          label="Город"
          name="city"
          :rules="[{ required: true, message: 'Пожалуйста введите город!' }]"
        >
          <Input
            v-model:value="formState.city"
            placeholder="Введите город"
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
    </Row>

    <Flex justify="center">
      <FormItem>
        <Button
          :loading="authStore.isLoading"
          type="primary"
          html-type="submit"
        >
          Зарегистрироваться
        </Button>
      </FormItem>
    </Flex>
  </Form>
</template>
