import { BaseLayer } from './base-layer';
import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three';

export class FloorLayer extends BaseLayer {
  constructor(options) {
    super(options);
    this.load(options);
  }
  load(options) {
    const { bottomHeight, color, centerX, centerY, width, height } = options;
    const geometry = new PlaneGeometry(width, height);
    const material = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 1,
      side: DoubleSide
    });
    const ground = new Mesh(geometry, material);
    ground.name = options.key || '';
    ground.rotation.x = Math.PI / 2;
    ground.position.y = bottomHeight;
    ground.position.x = centerX;
    ground.position.z = centerY;
    ground.visible = this.visible;
    this.origin = ground;
  }
  update(options) {
    console.log(options);
    const { bottomHeight, color, centerX, centerY, width, height } = options;
    const geometry = new PlaneGeometry(width, height);
    const ground = this.origin;
    if (ground) {
      ground.geometry = geometry;
      ground.rotation.x = Math.PI / 2;
      ground.position.y = bottomHeight;
      ground.position.x = centerX;
      ground.position.z = centerY;
    }
  }
}
