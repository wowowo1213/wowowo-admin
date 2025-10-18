import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueSvgIconPlugin } from '@yzfe/vue-svgicon';
import '@yzfe/svgicon/lib/svgicon.css';
import "../mock/user.ts";

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueSvgIconPlugin, { tagName: 'icon' });

app.mount('#app');
