<template>
  <el-dialog
    v-model="visible"
    title="添加模型"
    width="60%"
    top="10vh"
    :open-delay="1000"
    :close-delay="1000"
    :close-on-click-modal="false"
  >
    <el-form v-model="addForm" style="padding: 1em" label-width="100px">
      <el-form-item label="模型类型">
        <el-switch v-model="addForm.type"></el-switch>
      </el-form-item>
      <el-form-item label="父节点"> </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';

const visible = ref(false);
const addForm = reactive({
  key: '',
  type: '',
  parent: '',
  title: '',
  visible: ''
});

const open = () => {
  visible.value = true;
};

defineExpose({
  open
});
</script>

<style lang="less" scoped></style>
