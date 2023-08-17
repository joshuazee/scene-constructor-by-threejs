import type { DoorOptions } from 'pkg/types/three-map-layers';
import { BaseLayer } from './base-layer';

export class DoorLayer extends BaseLayer {
  constructor(options: DoorOptions) {
    super(options);
  }
  load() {}
  unload() {}
  setVisible(visible: boolean) {}
}
