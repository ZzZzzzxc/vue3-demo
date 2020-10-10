<template>
  <div class="list">
    <div class="status">
      {{ info }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
import getUserStatus from "../../hooks/getUserStatus";
import { toRef } from "vue";
export default {
  name: "TodoList",
  props: ["status"],
  setup(props) {
    const { info } = getUserStatus(toRef(props, "status"));
    return {
      info,
    };
  },
};
</script>
