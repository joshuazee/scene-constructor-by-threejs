import type { BaseLayer } from 'pkg/layer/base-layer';
import {
  LayerType,
  type BaseLayerOptions,
  type WallOptions,
  type FloorOptions
} from '../types/three-map-layers';
import { WallLayer } from 'pkg/layer/wall-layer';
import { FloorLayer } from 'pkg/layer/floor-layer';

export class LayerController {
  private layers: Array<BaseLayer>;
  private map: any;
  constructor() {
    this.layers = [];
    // this.view = view;
    //@ts-ignore
    // this.viewer.layerController = this;
  }
  setMap(map: any) {
    this.map = map;
    this.layers.forEach((layer) => {
      layer.origin && this.map.scene.add(layer.origin);
    });
  }
  add(options: BaseLayerOptions) {
    const { type } = options;
    let layer: BaseLayer;
    switch (type) {
      case LayerType.wall:
        layer = new WallLayer(options as WallOptions);
        break;
      case LayerType.floor:
        layer = new FloorLayer(options as FloorOptions);
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
      if (this.map && layer.origin) {
        this.map.scene.remove(layer.origin);
      }
    }
  }
  get(key: string) {
    return this.layers.find((layer) => layer.key === key);
  }
  setVisible(key: string, visible: boolean) {
    const layer = this.layers.find((layer) => layer.key === key);
    layer && layer.setVisible(visible);
  }
  update(options: BaseLayerOptions) {
    const layer = this.layers.find((layer) => layer.key === options.key);
    layer && layer.update(options);
  }
  // clearHighlights() {
  //   // 该方法针对所有点击高亮展示图层做清除
  //   this.layers.forEach((layer) => {
  //     layer.pick(undefined);
  //   });
  // }
}
