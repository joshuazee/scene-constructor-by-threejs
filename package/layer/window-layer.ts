import type { WindowOptions } from 'pkg/types/three-map-layers';
import { BaseLayer } from './base-layer';

export class WindowLayer extends BaseLayer {
  constructor(options: WindowOptions) {
    super(options);
  }
  load() {}
  unload() {}
  setVisible(visible: boolean) {}
}
