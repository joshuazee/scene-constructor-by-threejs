import type { AnyLayerOptions, BaseLayerOptions, LayerType } from 'pkg/types/three-map-layers';
import { Object3D } from 'three';

export abstract class BaseLayer {
  key: string;
  title: string;
  type: LayerType;
  visible: boolean;
  origin: Object3D | undefined;
  options: any;
  constructor(options: BaseLayerOptions) {
    this.key = options.key || '';
    this.visible = options.visible || true;
    this.type = options.type;
    this.title = options.title;
    this.options = options;
  }
  setVisible(visible: boolean) {
    this.origin && (this.origin.visible = visible);
  }
  abstract load(options: AnyLayerOptions): void;

  abstract update(options: AnyLayerOptions): void;
  // abstract unload(): void;
}
