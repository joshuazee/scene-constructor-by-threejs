<template>
  <div class="home-container">
    <viewer class="map-size"></viewer>
    <layer-controller></layer-controller>
  </div>
</template>

<script lang="ts" setup>
import viewer from '@/components/map-viewer/index.vue';
import LayerController from '@/components/layer-controller.vue';
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  .map-size {
    height: 100%;
  }
}
</style>
