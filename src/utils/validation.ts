import { FormInstance, Rule } from 'ant-design-vue/es/form';

export const validatePass = (repeatPassword: string, formRef: FormInstance) => {
  return async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('Пожалуйста введите пароль!');
    } else {
      const regexp = new RegExp(
        '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}',
        'g',
      );
      if (!regexp.test(value)) {
        return Promise.reject('Пароль слишком легкий!');
      }
      if (repeatPassword !== '') {
        formRef.validateFields('repeatPassword');
      }
      return Promise.resolve();
    }
  };
};

export const validatePass2 = (password: string) => {
  return async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('Пожалуйста повторите пароль!');
    } else if (value !== password) {
      return Promise.reject('Пароли не совпадают!');
    } else {
      return Promise.resolve();
    }
  };
};
