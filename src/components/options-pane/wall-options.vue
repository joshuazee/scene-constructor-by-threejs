<template>
  <div>中心点</div>
  <el-form-item label="x">
    <el-input-number v-model="options.centerX"></el-input-number>
  </el-form-item>
  <el-form-item label="y">
    <el-input-number v-model="options.centerY"></el-input-number>
  </el-form-item>
  <el-form-item label="宽度(cm)">
    <el-input-number v-model="options.width"></el-input-number>
  </el-form-item>
  <el-form-item label="高度(cm)">
    <el-input-number v-model="options.height"></el-input-number>
  </el-form-item>
  <el-form-item label="厚度(cm)">
    <el-input-number v-model="options.depth"></el-input-number>
  </el-form-item>
  <el-form-item label="角度">
    <el-input-number v-model="options.rotate" :min="0" :max="359"></el-input-number>
  </el-form-item>
  <!-- <el-form-item label="应用纹理">
    <el-switch v-model="options.useTexture"></el-switch>
  </el-form-item> -->
  <el-form-item label="颜色">
    <el-row>
      <el-col :span="4">
        <el-color-picker v-model="options.color" />
      </el-col>
      <el-col :span="20">
        <el-input disabled v-model="options.color"></el-input>
      </el-col>
    </el-row>
  </el-form-item>
  <el-form-item label="透明度">
    <el-input-number
      v-model="options.opacity"
      :precision="2"
      :step="0.01"
      :max="1"
      :min="0"
    ></el-input-number>
  </el-form-item>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

//refs
const options = ref(store.state.map.currentModel);
//emits
const emits = defineEmits(['updateOptions']);

watch(
  () => store.state.map.currentModel,
  (val) => {
    console.log('wallOptions变化');
    options.value = val;
  },
  {
    deep: true
  }
);

//mounted
onMounted(() => {});
</script>

<style lang="less" scoped></style>
