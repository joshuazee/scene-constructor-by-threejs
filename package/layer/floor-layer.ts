import type { FloorOptions } from 'pkg/types/three-map-layers';
import { BaseLayer } from './base-layer';
import { Vector2, Shape, ShapeGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three';

export class FloorLayer extends BaseLayer {
  constructor(options: FloorOptions) {
    super(options);
    this.load(options);
  }
  load(options: FloorOptions) {
    const { coordinates, bottomHeight, color, center } = options;
    const points = coordinates.map((i: [number, number]) => new Vector2(...i));
    const shape = new Shape(points);
    const geometry = new ShapeGeometry(shape);
    const material = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 1,
      side: DoubleSide
    });
    const ground = new Mesh(geometry, material);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = bottomHeight;
    // ground.position.x = center[0];
    // ground.position.z = center[1];
    ground.visible = this.visible;
    this.origin = ground;
  }
  unload() {}
}
