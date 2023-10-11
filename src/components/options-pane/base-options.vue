<template>
  <el-form v-model="options" style="padding: 1em" :label-width="100">
    <!-- <model-base-options v-if="showModelBaseOptions"></model-base-options> -->
    <component :is="currentOptions"></component>
  </el-form>
</template>

<script setup>
import { computed, ref, provide } from 'vue';
import { useStore } from 'vuex';
import { OptionsComponentList } from '.';
// import ModelBaseOptions from './model-base-options.vue';

const store = useStore();
const showModelBaseOptions = ref(false);
const options = ref({});
const currentOptions = computed(() => {
  const currentModel = store.state.map.currentModel;

  if (currentModel && currentModel.type) {
    showModelBaseOptions.value = true;
    return OptionsComponentList[currentModel.type];
  } else {
    showModelBaseOptions.value = false;
  }
  // return undefined;
  return OptionsComponentList['view'];
});

provide('options', currentOptions.value.options);
</script>

<style lang="less" scoped></style>
