import type { Viewer } from "cesium";
import type { BaseLayer } from "../layer/Layer";
import DataLoadFactory from "../loader/DataLoader";
import type { BaseLayerOptions } from "../types/layer";

export class LayerController {
  private viewer: Viewer;
  private layers: Array<BaseLayer>;
  constructor(viewer: Viewer) {
    this.layers = [];
    this.viewer = viewer;
    //@ts-ignore
    this.viewer.layerController = this;
  }
  add(options: BaseLayerOptions) {
    const layer = DataLoadFactory.load(this.viewer, options);
    this.layers.push(layer);
  }
  remove(key: string) {
    const index = this.layers.findIndex((layer) => layer.key === key);
    if (index >= 0) {
      const layer = this.layers.splice(index, 1)[0];
      layer.uninstall();
    }
  }
  get(key: string) {
    return this.layers.find((layer) => layer.key === key);
  }
  setVisible(key: string, visible: boolean) {
    const layer = this.layers.find((layer) => layer.key === key);
    layer && layer.setVisible(visible);
  }
  clearHighlights() {
    // 该方法针对所有点击高亮展示图层做清除
    this.layers.forEach((layer) => {
      layer.pick(undefined);
    });
  }
}
