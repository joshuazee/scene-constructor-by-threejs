<template>
  <transition name="animate-slide" mode="out-in">
    <div class="scene-builder-container" :key="animateKey">
      <div class="scene-builder-icon" @click="handleChangePaneStatus">
        <el-icon v-if="!showPane"><ArrowLeft /></el-icon>
        <el-icon v-else><ArrowRight /></el-icon>
      </div>
      <div v-if="showPane" class="scene-builder-pane">
        <component :is="currentOptions"></component>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import ViewOptions from './options-pane/view-options.vue';

const store = useStore();
const animateKey = ref(1);
const showPane = ref(false);

const OptionComponentList = ref({});

const currentOptions = computed(() => {
  const currentModel = store.state.map.currentModel;

  if (currentModel) {
    return OptionComponentList[currentModel.type];
  }
  return ViewOptions;
});

const handleChangePaneStatus = () => {
  animateKey.value++;
  showPane.value = !showPane.value;
};
</script>

<style lang="less" scoped>
.scene-builder-container {
  display: flex;
  align-items: flex-start;
  .scene-builder-icon {
    padding: 0.5em 1em;
    border-radius: 3px;
    background: @themeColor;
    color: #fff;
    cursor: pointer;
  }

  .scene-builder-pane {
    background: #fff;
    height: 80vh;
    min-width: 400px;
  }
}
</style>
