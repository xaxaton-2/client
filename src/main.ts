import { createApp } from 'vue';
import ui from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { addIcons } from 'oh-vue-icons';
import { BiTelegram, BiWhatsapp, CoVk } from 'oh-vue-icons/icons';
import App from './App.vue';
import './assets/styles/index.scss';
import { router } from './core/router';
import { store } from './core/store';

addIcons(BiTelegram, CoVk, BiWhatsapp);

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ui);

app.mount('#app');
