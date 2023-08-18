import type { WallOptions } from 'pkg/types/three-map-layers';
import { BaseLayer } from './base-layer';
import { BoxGeometry, MeshBasicMaterial, Object3D, DoubleSide, Mesh } from 'three';
import { degreesToRadians } from '@turf/helpers';
import * as THREE from 'three';
const ThreeBSP = require('jthreebsp')(THREE);

export class WallLayer extends BaseLayer {
  constructor(options: WallOptions) {
    super(options);
    this.load(options);
  }
  load(options: WallOptions) {
    const o3d = new Object3D();
    const { width, height, depth, color, center, rotate, opacity, doors } = options;
    const geometry = new BoxGeometry(width + depth, height, depth);
    const material = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: DoubleSide
    });
    const wall = new Mesh(geometry, material);
    wall.position.x = center[0];
    wall.position.y = height / 2;
    wall.position.z = -center[1];
    wall.rotateY(degreesToRadians(rotate));
    o3d.add(wall);

    this.origin = o3d;
  }
  unload() {}
}

const createDoorModel = () => {};

const createWIndowModel = () => {};
