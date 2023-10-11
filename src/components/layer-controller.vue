<template>
  <div class="layer-controller-container">
    <transition name="animate-transform" mode="out-in">
      <div v-if="!showPane" class="layer-controller-icon" @click="showPane = !showPane">图层</div>
      <div v-else class="layer-controller-pane">
        <div class="layer-controller-pane-header">
          <div style="display: flex; align-items: center">
            <span class="layer-controller-pane-header-title">资源目录</span>
            <!-- <el-icon
              style="
                margin-left: 1em;
                padding: 0.25em;
                border-radius: 5px;
                border: 1px dashed #ccc;
                cursor: pointer;
              "
              @click="openAddLayerModal"
            >
              <Plus />
            </el-icon> -->
          </div>
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
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
          @check-change="handleCheckChange"
        >
          <template v-slot="{ node, data }">
            <div class="tree-node-cls">
              <div>
                <span @click.stop="setChecked(node)">{{ data.title }}</span>
                <el-switch
                  v-if="data.hasLegends === true"
                  v-model="data.showLegends"
                  size="small"
                ></el-switch>
              </div>
              <div>
                <!-- <el-icon><Top /></el-icon>
                <el-icon><Bottom /></el-icon>
                <el-icon><Plus /></el-icon> -->
                <el-tooltip effect="dark" content="删除图层" placement="top">
                  <el-icon
                    style="
                      background: red;
                      border-radius: 50%;
                      color: white;
                      padding: 2px;
                      font-size: 10px;
                    "
                    @click="handleDeleteLayer"
                    ><Minus
                  /></el-icon>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
    </transition>
  </div>
  <div class="legendContainer" v-if="showLegends"></div>
  <add-layer-dialog></add-layer-dialog>
</template>

<script lang="ts" setup>
import { Close, Top, Bottom, Plus, Minus } from '@element-plus/icons-vue';
import { watch, ref } from 'vue';
import { useStore } from 'vuex';
import { v4 as uuid } from 'uuid';
import { LayerController } from 'pkg/control/layer-controller';
import AddLayerDialog from './add-layer-dialog.vue';

const emits = defineEmits(['load-completed']);
const store = useStore();
const treeRef = ref();
const showPane = ref(false);
const showLegends = ref(false);
const defaultExpandedKeys = ref<Array<string>>([]);
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
          node.expand && defaultExpandedKeys.value.push(node.key);
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

watch(
  () => store.state.map.currentModel,
  (val) => {
    if (val) {
      console.log('响应model属性变化===', val);
      control.update(val);
    }
  },
  { deep: true }
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

const getLayer = (key: string) => control.get(key);
const updateLayer = (options: any) => control.update(options);

const handleDeleteLayer = () => {};

const openAddLayerModal = () => {};

defineExpose({ getLayer, setMap, updateLayer });
</script>

<style lang="less" scoped>
.layer-controller-container {
  position: absolute;
  top: 2em;
  left: 2em;
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
        flex: 1;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
