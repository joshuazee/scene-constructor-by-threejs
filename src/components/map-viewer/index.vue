<template>
  <div ref="containerRef" class="three-map-container">
    <div ref="mapRef"></div>
  </div>
</template>

<script lang="ts" setup>
import BaseView from 'pkg/three/view/view-base';
import { ref, onMounted, computed } from 'vue';
// import { createGeoPlate } from 'pkg/three/entities/geo-plate';
// import { useStore } from 'vuex';
// import { formatFeatureCollectionData2, calcCameraPosition, useProjection } from './util';
// import axios from 'axios';
// import { Color, type Object3D } from 'three';

// const store = useStore();
const containerRef = ref<string | Element>('');
const mapRef = ref<string | Element>('');

let view: BaseView;
// , plate: Object3D;

// const mapFillColor = '#296bb5',
//   mapFillOpacity = 0.7,
//   mapHightlightColor = '#00fffc',
//   mapTopLineColor = '#FFF',
//   mapTopLineWidth = 1,
//   billboardConfig = {
//     active: {
//       padding: '2px 5px',
//       color: '#bd3e0d',
//       background: '#ffd133'
//     },
//     custom: {
//       padding: '0',
//       color: '#fff',
//       background: 'transparent'
//     }
//   },
//   // nameField = "NAME",
//   codeField = 'REGIONCODE';

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
  view.animate(viewRenderCallback);
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

const viewRenderCallback = () => {};

// const _lastFeature = ref<any>();

// const lastFeature = computed({
//   get: () => _lastFeature,
//   set: (feature: any) => {
//     if (_lastFeature.value) {
//       const el: HTMLDivElement = _lastFeature.value.children[0].element;
//       el.style.padding = billboardConfig.custom.padding;
//       el.style.background = billboardConfig.custom.background;
//       el.style.color = billboardConfig.custom.color;

//       _lastFeature.value.material.forEach((material: any) => {
//         material.color = new Color(mapFillColor);
//       });
//     }

//     _lastFeature.value = feature;

//     if (feature) {
//       const properties = feature.properties;
//       store.dispatch('sub/useActiveChildRegion', properties[codeField].toString());
//       const materials = feature.material;
//       materials.forEach((material: any) => {
//         material.color = new Color(mapHightlightColor);
//       });

//       const el: HTMLDivElement = feature.children[0].element;
//       el.style.padding = billboardConfig.active.padding;
//       el.style.background = billboardConfig.active.background;
//       el.style.color = billboardConfig.active.color;
//     } else {
//       store.dispatch('sub/useActiveChildRegion', '-1');
//     }
//   }
// });

const onMapClickHandler = (features: any) => {
  // lastFeature.value = features[0]?.object;
};

// const drawArea = () => {
//   const currentRegion = store.state.sub.activeRegion;
//   let dataURL = '',
//     radius = 0,
//     phi = 0,
//     theta = 0,
//     scale = 0,
//     center: [number, number] = [0, 0],
//     depth = 0;
//   if (currentRegion) {
//     dataURL = currentRegion.boundaryUrl;
//     currentRegion.center && (center = currentRegion.center);
//     currentRegion.depth && (depth = currentRegion.depth);
//     currentRegion.scale && (scale = currentRegion.scale);
//     if (currentRegion.cameraOpt) {
//       radius = currentRegion.cameraOpt?.radius;
//       theta = currentRegion.cameraOpt?.theta;
//       phi = currentRegion.cameraOpt?.phi;
//     }
//   }
//   if (dataURL) {
//     axios.get(dataURL).then((response) => {
//       drawFn(response.data);
//     });
//   }

//   const drawFn = (data: any) => {
//     const projection = useProjection({ center, scale });
//     let plateData = formatFeatureCollectionData2(data, projection);
//     plate = createGeoPlate(plateData, {
//       boundaryData: undefined,
//       depth,
//       topUseTexture: false,
//       topUseColorMix: true,
//       topColor: mapFillColor,
//       topOpacity: mapFillOpacity,
//       sideColor: mapFillColor,
//       sideOpacity: mapFillOpacity,
//       openTopLine: true,
//       lineColor: mapTopLineColor,
//       lineWith: mapTopLineWidth
//     });
//     view.scene.add(plate);

//     const child = store.state.sub.activeChildRegion;
//     if (child) {
//       const childPlate: any = plate.children[0].children.find(
//         (p: any) => p.properties[codeField].toString() === child.regionCode
//       );
//       lastFeature.value = childPlate;
//     }

//     setCameraPosition(theta, phi, radius);

//     view.pick({ type: 0, callback: onMapClickHandler }, plate.children[0].children);
//   };
// };

const setCameraPosition = (theta: number, phi: number, radius: number) => {
  const position = calcCameraPosition(radius, phi + 90, theta);
  view.camera.position.set(position.x, position.y, position.z);
  view.camera.lookAt(0, 0, 0);
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.three-map-container {
  position: relative;
}
</style>
