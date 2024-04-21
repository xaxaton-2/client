import { createApp } from 'vue';
import ui from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { Chart, registerables } from 'chart.js';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { addIcons } from 'oh-vue-icons';
import {
  BiEasel2Fill,
  BiTelegram,
  BiWhatsapp,
  CoVk,
  MdScience,
  MdSportsbasketball,
  MdVolunteeractivism,
} from 'oh-vue-icons/icons';
import App from './App.vue';
import './assets/styles/index.scss';
import { router } from './core/router';
import { store } from './core/store';

Chart.register(...registerables);

dayjs.locale('ru');
dayjs.extend(relativeTime);

addIcons(
  BiTelegram,
  CoVk,
  BiWhatsapp,
  MdScience,
  MdSportsbasketball,
  BiEasel2Fill,
  MdVolunteeractivism,
);

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ui);

app.mount('#app');
