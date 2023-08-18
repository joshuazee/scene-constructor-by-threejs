import type { WallOptions } from 'pkg/types/three-map-layers';
import { BaseLayer } from './base-layer';
import { BoxGeometry, MeshBasicMaterial, Object3D, DoubleSide, Mesh } from 'three';
import { degreesToRadians } from '@turf/helpers';

export class WallLayer extends BaseLayer {
  constructor(options: WallOptions) {
    super(options);
    this.load(options);
  }
  load(options: WallOptions) {
    const o3d = new Object3D();
    const { width, height, depth, color, center, rotate } = options;
    const geometry = new BoxGeometry(width, height, depth);
    const material = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 1,
      side: DoubleSide
    });
    const wall = new Mesh(geometry, material);
    wall.position.x = center[0];
    wall.position.z = -center[1];
    wall.rotateY = degreesToRadians(rotate);
    o3d.add(wall);
    this.origin = o3d;
  }
  unload() {}
  setVisible(visible: boolean) {}
}

const createDoorModel = () => {};

const createWIndowModel = () => {};
