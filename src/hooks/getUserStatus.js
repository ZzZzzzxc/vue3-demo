import { computed } from "vue";
import { FREE, INPUT } from "../constants";

const INFO_MAP = {};
INFO_MAP[FREE] = "用户空闲";
INFO_MAP[INPUT] = "用户正在输入...";

export default function(status) {
  console.log(`【getUserStatus】钩子执行了~~`);
  const info = computed(() => INFO_MAP[status.value]);
  return {
    info,
  };
}
