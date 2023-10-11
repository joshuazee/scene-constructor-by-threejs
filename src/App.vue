<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { getSysConfigs } from '@/api/map';
import { handleCommonResponse } from '@/api/util';

const store = useStore();

onMounted(() => {
  getSysConfigs()
    .then((response) => {
      const data = handleCommonResponse(response);
      store.commit('map/setLayerConfig', data.layers);
      store.commit('map/setMapConfig', data.map);
    })
    .catch((e) => {
      console.log(e);
      console.error('配置文件获取失败');
    });
});
</script>

<style scoped></style>
