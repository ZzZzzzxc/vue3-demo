import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// warn 回调
const warnHandler = (msg, vm, trace) => {
  console.log(trace);
};

// error 回调
const errorHandler = (err, vm, info) => {
  console.log(err);
  console.log(info);
};

// 全局属性
const globalProperties = {
  appName: "vue3 demo",
};

// 自定义元素前缀
const isCustomElement = tag => tag.startsWith("zxc-");

const performance = true;

app.config = {
  errorHandler,
  warnHandler,
  globalProperties,
  isCustomElement,
  performance,
};

app.mount("#app");
