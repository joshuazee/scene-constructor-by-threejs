<template>
  <div ref="containerRef" class="three-map-container">
    <div ref="mapRef"></div>
  </div>
  <layer-controller
    ref="layerControllerRef"
    class="layer-controller-position"
    @load-completed="handleLoadCompleted"
  ></layer-controller>
  <scene-builder v-if="editable" class="scene-builder-position"></scene-builder>
</template>

<script lang="ts" setup>
import BaseView from 'pkg/three/view/view-base';
import { ref, onMounted, computed } from 'vue';
import LayerController from '../layer-controller.vue';
import SceneBuilder from '../scene-builder.vue';
// import { useStore } from 'vuex';

// const store = useStore();
const containerRef = ref<string | Element>('');
const mapRef = ref<string | Element>('');
const layerControllerRef = ref();
const editable = ref(true);

let view: BaseView;

onMounted(() => {
  const { width, height } = calcSize();
  view = new BaseView({
    target: mapRef.value,
    width: width,
    height: height,
    showAxesHelper: true,
    mouseInteraction: true,
    interActionType: 1,
    cssRenderer: false
  });
  view.setBackground({ alpha: 1, color: '#000' });
  view.animate();
});

//methods
const calcSize = () => {
  if (containerRef.value) {
    const w = Math.max((containerRef.value as Element).clientWidth, 400);
    const h = Math.max((containerRef.value as Element).clientHeight, 400);
    return {
      width: w,
      height: h
    };
  }
  return {
    width: 400,
    height: 300
  };
};

const handleLoadCompleted = () => {
  layerControllerRef.value.setMap(view);
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.three-map-container {
  position: relative;
  height: 100%;
}
.layer-controller-position {
  position: absolute;
  top: 2em;
  left: 2em;
}
.scene-builder-position {
  position: absolute;
  right: 0;
  top: 2em;
}
</style>
