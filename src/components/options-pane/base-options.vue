<template>
  <el-form v-model="currentOptions.options" style="padding: 1em">
    <component
      :is="currentOptions.comp"
      :childType="currentOptions.childType"
      @updateOptions="handleUpdateView"
    ></component>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue';
import { useStore } from 'vuex';
import { OptionsComponentList } from '.';

const store = useStore();
const currentOptions = computed(() => {
  const currentModel = store.state.map.currentModel;
  const options = {
    comp: undefined,
    options: undefined,
    childType: undefined
  };

  if (currentModel && currentModel.type) {
    options.comp = OptionsComponentList['model'];
    options.childType = currentModel.type;
  } else {
    options.comp = OptionsComponentList['viewer'];
  }
  options.options = currentModel;
  console.log(options);
  return options;
});

provide('options', currentOptions.value.options);

const handleUpdateView = (val: any) => {
  store.commit('map/setEditIndex', val);
};
</script>

<style lang="less" scoped></style>
