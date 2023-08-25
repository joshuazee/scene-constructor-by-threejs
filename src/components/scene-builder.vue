<template>
  <transition name="animate-slide">
    <div class="scene-builder-container" :key="animateKey">
      <div class="scene-builder-icon" @click="handleChangePaneStatus">
        <el-icon></el-icon>
      </div>
      <div v-if="showPane" class="scene-builder-pane"></div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const animateKey = ref(1);
const showPane = ref(false);

const handleChangePaneStatus = () => {
  animateKey.value++;
  showPane.value = !showPane.value;
};
</script>

<style lang="less" scoped>
.scene-builder-container {
  display: flex;
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
