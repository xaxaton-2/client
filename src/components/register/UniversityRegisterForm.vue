<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Button, Col, Flex, Form, Input, Row, Upload, UploadFile } from 'ant-design-vue';
import { FormInstance, FormItem } from 'ant-design-vue/es/form';
import { validatePass, validatePass2 } from '@/utils/validation';

interface FormState {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  city: string;
  image: UploadFile[];
}

const formState = reactive<FormState>({
  email: '',
  password: '',
  repeatPassword: '',
  name: '',
  city: '',
  image: [],
});

const formRef = ref<FormInstance | null>(null);

const onFinish = (values: FormState) => {
  console.log(values);
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
          <Input
            v-model:value="formState.password"
            placeholder="Введите пароль"
            type="password"
          />
        </FormItem>

        <FormItem
          label="Повторите пароль"
          name="repeatPassword"
          :rules="[
            { required: true, validator: validatePass2(formState.password), trigger: 'blur' },
          ]"
        >
          <Input
            v-model:value="formState.repeatPassword"
            placeholder="Повторите пароль"
            type="password"
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
          type="primary"
          html-type="submit"
        >
          Зарегистрироваться
        </Button>
      </FormItem>
    </Flex>
  </Form>
</template>
