<template>
  <div class="layer-controller-container">
    <transition name="transform-slide" mode="out-in">
      <div v-if="!showPane" class="layer-controller-icon" @click="showPane = !showPane">图层</div>
      <div v-else class="layer-controller-pane">
        <div class="layer-controller-pane-header">
          <div class="layer-controller-pane-header-title">资源目录</div>
          <el-icon class="layer-controller-pane-header-close" @click="showPane = !showPane">
            <Close />
          </el-icon>
        </div>
        <el-tree
          :data="layerTreeData"
          class="tree-cls"
          show-checkbox
          node-key="key"
          :default-expanded-keys="defaultExpandedKes"
          :default-checked-keys="defaultCheckedKeys"
        >
          <template v-slot="{ node, data }">
            <div>{{ data.title }}</div>
          </template>
        </el-tree>
      </div>
    </transition>
    <div class="legends" v-if="showLegends"></div>
  </div>
</template>

<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { v4 as uuid } from 'uuid';
// import type { AnyLayerOptions } from 'pkg/types/three-map-layers';

const store = useStore();

const showPane = ref(false);
const showLegends = ref(false);
const defaultExpandedKes = ref<Array<string>>([]);
const defaultCheckedKeys = ref<Array<string>>([]);

const layerTreeData = computed<Array<any>>(() => {
  const data = store.state.map.layers;
  if (data && data.length > 0) {
    const stack = [...data];
    while (stack.length > 0) {
      const node = stack.pop();
      !node.key && (node.key = uuid());
      if (node.children) {
        defaultExpandedKes.value.push(node.key);
        stack.push(...node.children);
      } else {
        if (node.visible) {
          defaultCheckedKeys.value.push(node.key);
        }
      }
    }
  }
  return data;
});
</script>

<style lang="less" scoped>
.layer-controller-container {
  position: absolute;
  top: 0;
  left: 0;

  .layer-controller-icon {
    padding: 0.5em 1em;
    border-radius: 3px;
    background: @themeColor;
    color: #fff;
    margin: 2em;
    cursor: pointer;
  }
  .layer-controller-pane {
    margin: 2em;
    min-width: 20em;
    min-height: 40em;
    background: #fff;

    .layer-controller-pane-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: @themeColor;
      color: #fff;

      .layer-controller-pane-header-title {
        padding-left: 1em;
      }
      .layer-controller-pane-header-close {
        padding: 0.5em;
        cursor: pointer;
        &:hover {
          background: #ff3500;
          color: #fff;
        }
      }
    }

    .tree-cls {
      padding: 1em;
      // background: @themeColor;
      // color: #fff;
    }
  }
}
</style>
