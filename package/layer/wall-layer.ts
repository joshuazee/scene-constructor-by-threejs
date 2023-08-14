import type { WallOptions } from 'pkg/types/three-map-layers';
import { BaseLayer } from './base-layer';

export class WallLayer extends BaseLayer {
  constructor(options: WallOptions) {
    super(options);
  }
  load() {}
  unload() {}
  setVisible(visible: boolean) {}
}
