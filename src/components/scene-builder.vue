<template>
  <div class="scene-builder-container">
    <div class="scene-builder-icon">配置</div>
    <transition name="animate-slide">
      <div v-if="showPane" class="scene-builder-pane"></div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showPane = ref(false);
</script>

<style lang="less" scoped>
.scene-builder-container {
  .scene-builder-icon {
    padding: 0.5em 1em;
    border-radius: 3px;
    background: @themeColor;
    color: #fff;
    cursor: pointer;
  }
}
</style>
