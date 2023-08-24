<template>
  <div class="layer-controller-container">
    <transition name="animate-transform" mode="out-in">
      <div v-if="!showPane" class="layer-controller-icon" @click="showPane = !showPane">图层</div>
      <div v-else class="layer-controller-pane">
        <div class="layer-controller-pane-header">
          <div class="layer-controller-pane-header-title">资源目录</div>
          <el-icon class="layer-controller-pane-header-close" @click="showPane = !showPane">
            <Close />
          </el-icon>
        </div>
        <el-tree
          ref="treeRef"
          :data="layerTreeData"
          class="tree-cls"
          show-checkbox
          node-key="key"
          :default-expanded-keys="defaultExpandedKes"
          :default-checked-keys="defaultCheckedKeys"
          @check-change="handleCheckChange"
        >
          <template v-slot="{ node, data }">
            <div class="tree-node-cls">
              <span @click.stop="setChecked(node)">{{ data.title }}</span>
              <el-switch
                v-if="data.hasLegends === true"
                v-model="data.showLegends"
                size="small"
              ></el-switch>
            </div>
          </template>
        </el-tree>
      </div>
    </transition>
    <div class="legends" v-if="showLegends"></div>
  </div>
</template>

<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue';
import { watch, ref } from 'vue';
import { useStore } from 'vuex';
import { v4 as uuid } from 'uuid';
import { LayerController } from 'pkg/control/layer-controller';

const emits = defineEmits(['load-completed']);
const store = useStore();
const treeRef = ref();
const showPane = ref(false);
const showLegends = ref(false);
const defaultExpandedKes = ref<Array<string>>([]);
const defaultCheckedKeys = ref<Array<string>>([]);

const control = new LayerController();

const layerTreeData = ref([]);
watch(
  () => store.state.map.layers,
  (data) => {
    if (data && data.length > 0) {
      const stack = [...data];
      while (stack.length > 0) {
        const node = stack.pop();
        !node.key && (node.key = uuid());
        if (node.children) {
          node.expand && defaultExpandedKes.value.push(node.key);
          stack.push(...node.children);
        } else {
          control.add(node);
          if (node.visible) {
            defaultCheckedKeys.value.push(node.key);
          }
        }
      }
      emits('load-completed');
      layerTreeData.value = data;
    }
  }
);

const setChecked = (node: any) => {
  treeRef.value.setChecked(node.key, !node.checked);
};

const handleCheckChange = (node: any, checked: any) => {
  if (!node.children) {
    control.setVisible(node.key, checked);
  }
};

const setMap = (mapView: any) => {
  control.setMap(mapView);
};

defineExpose({ setMap });
</script>

<style lang="less" scoped>
.layer-controller-container {
  .layer-controller-icon {
    padding: 0.5em 1em;
    border-radius: 3px;
    background: @themeColor;
    color: #fff;
    cursor: pointer;
  }
  .layer-controller-pane {
    width: 20em;
    height: 35em;
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
      .tree-node-cls {
        min-width: 25em;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
