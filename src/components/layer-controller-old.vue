<template>
  <div>
    <div class="layer-controller" style="left: 100px; bottom: 50px" v-show="showLayerController">
      <div class="title">
        <div style="display: flex">
          <div class="text">图层</div>
          <div class="tail"></div>
        </div>
        <div
          class="close"
          @click="
            {
              showLayerController = false;
            }
          "
        >
          <close-outlined />
        </div>
      </div>
      <div class="content">
        <!-- <a-tree
        v-if="treeData && treeData.length > 0"
        :tree-data="treeData"
        checkable
        v-model:checkedKeys="checkedKeys"
        @check="checkTreeNodeHandler"
        default-expand-all
        showLine
      >
        <template #title="item">
          <div>
            <span>{{ item.title }}</span>
            <a-switch
              v-if="item.hasLegends === true"
              v-model:checked="item.legends.show"
              checked-children="开"
              un-checked-children="关"
              style="margin-left: 5px"
              @click="onLegendsChangeHandler(item)"
            />
          </div>
        </template>
      </a-tree> -->
      </div>
    </div>
    <div v-if="!showPane"></div>
    <!-- <div class="legends" v-if="legendsOptions" :style="legendStyle">
      <template v-if="legendsOptions.type === LegendsType.STANDARD">
        <div v-for="(item, idx) in legendsOptions.data" :key="idx" class="item">
          <div
            v-if="item.image && item.image.length > 0"
            :style="{
              background: `url(${item.image})`
            }"
            class="icon"
          ></div>
          <div
            v-else
            :style="{
              background: item.color
            }"
            class="icon"
          ></div>
          <div class="label">{{ item.title }}</div>
        </div>
      </template>
      <template v-else>
        <img
          :src="legendsOptions.imageUrl"
          :style="{
            width: legendsOptions.size[0] + 'px',
            height: legendsOptions.size[1] + 'px'
          }"
        />
      </template>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, type CSSProperties } from 'vue';
import { LayerController } from 'pkg/control/layer-controller';
import {
  LegendsType,
  type BaseLayerOptions,
  type LegendsOptions
} from 'pkg/types/three-map-layers';
import { v4 as uuid } from 'uuid';

const emits = defineEmits(['load-completed']);

const showLayerController = ref<boolean>(false);

let controller: LayerController;

const treeData = ref<TreeProps['treeData']>([]);
const checkedKeys = ref<string[]>([]);

const legendStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (legendsOptions.value) {
    legendsOptions.value.position.left && (style.left = legendsOptions.value.position.left + 'px');
    legendsOptions.value.position.right &&
      (style.right = legendsOptions.value.position.right + 'px');
    legendsOptions.value.position.top && (style.top = legendsOptions.value.position.top + 'px');
    legendsOptions.value.position.bottom &&
      (style.bottom = legendsOptions.value.position.bottom + 'px');
    if (legendsOptions.value.size) {
      style.maxWidth = legendsOptions.value.size[0] + 'px';
      style.maxHeight = legendsOptions.value.size[1] + 'px';
    }
  }
  return style;
});

const legends = ref<LegendsOptions>();
const legendsOptions = computed<LegendsOptions | undefined>({
  get: () => legends.value,
  set: (val: LegendsOptions | undefined) => {
    if (legends.value) {
      legends.value.show = false;
    }
    legends.value = val;
  }
});

//methods
const load = (viewer: Viewer) => {
  controller = new LayerController(viewer);

  getLayerConfig().then((res) => {
    const { layers, keys } = resolveLayerConfigJSON(res.data);
    treeData.value = layers;
    checkedKeys.value = keys;
    emits('load-completed');
  });
};

const open = () => {
  showLayerController.value = !showLayerController.value;
};

const resolveLayerConfigJSON = (layers: any) => {
  const list = [...layers];
  const checkedKeys = [];
  while (list.length > 0) {
    const item = list.shift();
    if (!item.key) {
      item.key = uuid();
    }
    if (item.children) {
      if (item.children.length > 0) {
        list.push(...item.children);
      } else {
        item.isLeaf = false;
      }
    } else {
      item.isLeaf = true;
      controller.add(item as BaseLayerOptions);
      if (item && item.visible === true) {
        checkedKeys.push(item.key);
      }
      if (item.legends) {
        item.hasLegends = true;
        if (item.legends.show === true) {
          legendsOptions.value = item.legends;
        }
      } else {
        item.hasLegends = false;
      }
    }
  }
  return { layers, keys: checkedKeys };
};

const checkTreeNodeHandler = (keys: any, e: any) => {
  if (e.event === 'check') {
    const node = e.node;
    const checked = e.checked;
    if (node.children && node.children.length > 0) {
      const list = [...node.children];
      while (list.length > 0) {
        const n = list.shift();
        if (n.children && n.children.lenth > 0) {
          list.push(...n.children);
        } else {
          setLayerVisible(n.key, checked);
        }
      }
    } else {
      setLayerVisible(node.key, checked);
    }
  }
};

const onLegendsChangeHandler = (item: BaseLayerOptions) => {
  if (item.legends!.show === true) {
    legendsOptions.value = item.legends;
  } else {
    legendsOptions.value = undefined;
  }
};

const setLayerVisible = (key: string, visible: boolean) => {
  controller.setVisible(key, visible);
};

const addLayer = (options: any) => {
  controller.add(options);
};

defineExpose({ load, open, setLayerVisible, addLayer });
</script>

<style lang="less" rel="stylesheet/less" scoped>
.layer-controller {
  position: absolute;
  min-width: 260px;
  max-width: 420px;
  min-height: 400px;
  max-height: 650px;
  background: rgba(0, 0, 0, 0.2);
  .title {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #fff;
    white-space: nowrap;
    .text {
      padding: 0 20px 0 10px;
      line-height: 36px;
      background: linear-gradient(to right, #1c7be2 0%, #1cace2 100%);
    }
    .close {
      width: 36px;
      cursor: pointer;
      text-align: center;
      vertical-align: middle;
      line-height: 36px;
    }

    .tail {
      width: 101px;
      margin-left: -1px;
      background: url('@/assets/image/building-graph-title-tail.png') no-repeat;
    }
  }
}

.legends {
  position: absolute;
  // display: flex;
  font-size: 14px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.3);
  .item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    .icon {
      width: 24px;
      height: 16px;
      border-radius: 3px;
      margin-right: 5px;
    }
  }
  // div {
  //   padding: 2px 5px;
  //   margin: 0 2px;
  //   border-radius: 4px;
  // }
}
</style>
