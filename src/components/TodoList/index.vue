<template>
  <div class="list-wrap">
    <input v-model="inputValue" placeholder="请输入待办事项" />
    <button @click="commit">提交</button>
    <list :status="status">
      <h2>待办事项</h2>
      <list-item
        @complete="handleComplete"
        @delete="handleDelete"
        v-for="(item, idx) in listData"
        :key="item.created"
        :label="item"
        :idx="idx"
        :hasTools="true"
      />
      <h2>完成事项</h2>
      <list-item
        @complete="handleComplete"
        @delete="handleDelete"
        v-for="(item, idx) in completeListData"
        :key="item.created"
        :label="item"
        :idx="idx"
      />
    </list>
    <teleport to="#teleport">
      <transition name="fade">
        <div v-if="show" class="toast-wrap">
          <div class="toast-msg">
            用户成功提交，{{ TIME / 1000 }}秒后自动关闭
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { FREE, INPUT } from "../../constants";
import { formatDate } from "../../utils";
import { ref, watch, watchEffect } from "vue";
import ListItem from "./item";
import List from "./list";
import showTotast from "../../hooks/showTotast";
const formatData = value => {
  return {
    value,
    created: formatDate(new Date()),
  };
};
const TIME = 2000; // 显示时间
export default {
  // setup 在创建组件实例之前执行
  setup() {
    const { show } = showTotast(TIME);
    const inputValue = ref(); // 输入值
    const listData = ref([]); // 待办列表
    const status = ref(FREE); // 用户状态
    const completeListData = ref([]); // 完成列表
    watch(inputValue, v => {
      status.value = v ? INPUT : FREE;
      console.log(`【watch】【inputValue】更新了，新的值为：${v}`);
    });
    watchEffect(() =>
      console.log(
        `【watchEffect】【inputValue】更新了，新的值为：${inputValue.value}`
      )
    );
    const commit = () => {
      inputValue.value && listData.value.push(formatData(inputValue.value));
      inputValue.value = "";
      show.value = true;
    };
    const handleDelete = (label, idx) => {
      listData.value.splice(idx, 1);
    };
    const handleComplete = (label, idx) => {
      completeListData.value.push(
        formatData(listData.value.splice(idx, 1)[0].value)
      );
    };
    return {
      inputValue,
      listData,
      commit,
      status,
      handleDelete,
      handleComplete,
      completeListData,
      showTotast,
      show,
      TIME,
    };
  },
  components: { List, ListItem },
};
</script>

<style lang="scss" scoped>
.toast-wrap {
  width: 300px;
  height: 130px;
  line-height: 130px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
