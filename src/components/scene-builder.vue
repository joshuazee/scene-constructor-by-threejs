<template>
  <transition name="animate-slide" mode="out-in">
    <div class="scene-builder-container" :key="animateKey">
      <div class="scene-builder-icon" @click="handleChangePaneStatus">
        <el-icon v-if="!showPane"><ArrowLeft /></el-icon>
        <el-icon v-else><ArrowRight /></el-icon>
      </div>
      <div v-if="showPane" class="scene-builder-pane">
        <div class="scene-builder-pane-header">属性编辑</div>
        <base-options></base-options>
        <!-- <component :is="currentOptions"></component> -->
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, type Component } from 'vue';
import BaseOptions from './options-pane/base-options.vue';

const animateKey = ref(1);
const showPane = ref(false);

const OptionComponentList = ref<Record<string, Component>>({});

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
    padding: 0.5em;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background: @themeColor;
    color: #fff;
    cursor: pointer;
  }

  .scene-builder-pane {
    background: #fff;
    height: 80vh;
    min-width: 400px;
    .scene-builder-pane-header {
      padding: 0.5em;
    }
  }
}
</style>
