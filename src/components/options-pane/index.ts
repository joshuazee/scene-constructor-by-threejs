import ViewOptions from './view-options.vue';
import WallOptions from './wall-options.vue';
import FloorOptions from './floor-options.vue';
import { LayerType } from 'pkg/types/three-map-layers';

export const OptionsComponentList: Record<string, any> = {
  view: ViewOptions,
  wall: WallOptions,
  floor: FloorOptions
};
