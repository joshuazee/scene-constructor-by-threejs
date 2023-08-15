import type { BaseLayerOptions, LayerType } from 'pkg/types/three-map-layers';

export abstract class BaseLayer {
  key: string;
  type: LayerType;
  visible: boolean;
  constructor(options: BaseLayerOptions) {
    this.key = options.key || '';
    this.visible = options.visible || true;
    this.type = options.type;

    this.load();
  }
  abstract setVisible(visible: boolean): void;
  abstract load(): void;
  abstract unload(): void;
}
