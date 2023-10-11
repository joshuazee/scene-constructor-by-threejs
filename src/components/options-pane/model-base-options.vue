<template>
  <div>中心点</div>
  <el-form-item label="x">
    <el-input-number v-model="options.center[0]"></el-input-number>
  </el-form-item>
  <el-form-item label="y">
    <el-input-number v-model="options.center[0]"></el-input-number>
  </el-form-item>
  <!-- <el-form-item label="z">
    <el-input-number></el-input-number>
  </el-form-item> -->
  <div>旋转</div>
  <el-form-item label="x">
    <el-input-number></el-input-number>
  </el-form-item>
  <el-form-item label="y">
    <el-input-number></el-input-number>
  </el-form-item>
  <el-form-item label="z">
    <el-input-number></el-input-number>
  </el-form-item>
</template>

<script setup>
import { ref } from 'vue';
//refs
const options = ref(inject('options', {}));
</script>

<style lang="less" scoped></style>
