import './styles/base.less';
import './styles/theme.less';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Theme, changeTheme } from './util';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(router);

app.use(store);

app.use(ElementPlus);

app.mount('#app');

changeTheme(Theme.Default);
