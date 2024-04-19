import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import './assets/styles/index.scss';
import { router } from './core/router';
import { store } from './core/store';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Antd);

app.mount('#app');
