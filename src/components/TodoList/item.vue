<template>
  <div class="todo-item">
    <span>【{{ showIdx }}】</span>
    <span>【{{ label.created }}】</span>
    <span>{{ label.value }}</span>
    <div class="tool" v-if="hasTools">
      <button @click="handleComplete">完成</button>
      <button @click="handleDelete">删除</button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "TodoItem",
  props: ["label", "hasTools", "idx"],
  setup(props, ctx) {
    const showIdx = computed(() => props.idx + 1);
    const handleComplete = () => {
      ctx.emit("complete", props.label, props.idx);
    };
    const handleDelete = () => {
      ctx.emit("delete", props.label, props.idx);
    };
    return {
      handleComplete,
      handleDelete,
      showIdx,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
}
</style>
