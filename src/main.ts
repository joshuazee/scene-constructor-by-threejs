import './styles/base.less';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Theme, changeTheme } from './util';

const app = createApp(App);

app.use(router);

app.use(store);

app.mount('#app');

changeTheme(Theme.Default);
