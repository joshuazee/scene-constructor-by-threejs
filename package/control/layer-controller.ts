import type { BaseLayer } from 'pkg/layer/base-layer';
import { LayerType, type AnyLayerOptions } from '../types/three-map-layers';
import { WallLayer } from 'pkg/layer/wall-layer';
import { DoorLayer } from 'pkg/layer/door-layer';
import { WindowLayer } from 'pkg/layer/window-layer';

export class LayerController {
  private layers: Array<BaseLayer>;
  private view: any;
  constructor() {
    this.layers = [];
    // this.view = view;
    //@ts-ignore
    // this.viewer.layerController = this;
  }
  setMap(view: any) {
    this.view = view;

    this.layers.forEach((layer) => {
      layer.origin && this.view.scene.add(layer.origin);
    });
  }
  add(options: AnyLayerOptions) {
    const { type } = options;
    let layer: BaseLayer;
    switch (type) {
      case LayerType.WALL:
        layer = new WallLayer(options);
        break;
      case LayerType.DOOR:
        layer = new DoorLayer(options);
        break;
      case LayerType.WINDOW:
        layer = new WindowLayer(options);
        break;
      default:
        throw 'invalidated layer constructor options';
    }
    this.layers.push(layer);
  }
  remove(key: string) {
    const index = this.layers.findIndex((layer) => layer.key === key);
    if (index >= 0) {
      const layer = this.layers.splice(index, 1)[0];
      // layer.unload();
    }
  }
  get(key: string) {
    return this.layers.find((layer) => layer.key === key);
  }
  setVisible(key: string, visible: boolean) {
    const layer = this.layers.find((layer) => layer.key === key);
    layer && layer.setVisible(visible);
  }
  // clearHighlights() {
  //   // 该方法针对所有点击高亮展示图层做清除
  //   this.layers.forEach((layer) => {
  //     layer.pick(undefined);
  //   });
  // }
}
