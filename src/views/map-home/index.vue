<template>
  <div class="home-container">
    <viewer></viewer>
  </div>
</template>

<script lang="ts" setup>
import viewer from '@/components/map-viewer/index.vue';
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
