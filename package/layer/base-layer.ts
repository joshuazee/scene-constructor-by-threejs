import type { BaseLayerOptions, LayerType } from 'pkg/types/three-map-layers';
import { Object3D } from 'three';

export abstract class BaseLayer {
  key: string;
  type: LayerType;
  visible: boolean;
  origin: Object3D | undefined;
  constructor(options: BaseLayerOptions) {
    this.key = options.key || '';
    this.visible = options.visible || true;
    this.type = options.type;

    this.load();
  }
  abstract setVisible(visible: boolean): void;
  abstract load(): void;
  // abstract unload(): void;
}
