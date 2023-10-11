<template>
  <el-form-item label="显示辅助线">
    <el-checkbox v-model="options.showAxesHelper"></el-checkbox>
  </el-form-item>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emits = defineEmits(['updateOptions']);

const options = ref(store.state.map.map);

// watch(
//   () => store.state.map.map,
//   (val) => {
//     console.log('mapConfig变化');
//     // options.value = val;
//   },
//   { deep: true }
// );
</script>

<style lang="less" scoped></style>
