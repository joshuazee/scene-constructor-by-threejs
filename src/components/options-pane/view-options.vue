<template>
  <el-collapse accordion>
    <el-collapse-item title="辅助线">
      <el-form-item label="是否显示">
        <el-checkbox v-model="options.showAxesHelper"></el-checkbox>
      </el-form-item>
      <el-form-item label="辅助线长度">
        <el-input-number v-model="options.axesHelperWidth"></el-input-number>
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { ref, inject, watch } from 'vue';

const emits = defineEmits(['updateOptions']);

const options = ref<any>(inject('options', {}));

watch(
  options,
  (val, oldVal) => {
    if (val == oldVal) {
      emits('updateOptions', val);
    }
  },
  { deep: true }
);
</script>

<style lang="less" scoped></style>
