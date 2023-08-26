import './styles/base.less';
import './styles/theme.less';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Theme, changeTheme } from './util';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);

app.use(store);

app.use(ElementPlus);

app.mount('#app');

changeTheme(Theme.Default);
