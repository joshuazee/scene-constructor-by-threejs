import { BaseLayer } from './base-layer';
import { BoxGeometry, MeshBasicMaterial, Object3D, DoubleSide, Mesh, Euler } from 'three';
import { degreesToRadians } from '@turf/helpers';
import OctreeCSG from 'pkg/lib/OctreeCSG/OctreeCSG.js';

export class WallLayer extends BaseLayer {
  constructor(options) {
    super(options);
    this.load(options);
  }
  load(options) {
    const o3d = new Object3D();
    o3d.name = options.key || '';
    const { width, height, depth, color, centerX, centerY, rotate, opacity, doors, windows } =
      options;
    const geometry = new BoxGeometry(width + depth, height, depth);
    const material = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: DoubleSide
    });
    let wall = new Mesh(geometry, material);
    wall.name = options.key || '';

    if (doors && doors.length > 0) {
      doors.forEach((door) => {
        const result = createDoorWindowModel(wall, door);
        //@ts-ignore
        wall = result.wall;
        //@ts-ignore
        o3d.add(result.obj, result.border);
      });
    }

    if (windows && windows.length > 0) {
      windows.forEach((window) => {
        const result = createDoorWindowModel(wall, window);
        //@ts-ignore
        wall = result.wall;
        //@ts-ignore
        o3d.add(result.door, result.border);
      });
    }

    o3d.add(wall);

    o3d.position.x = centerX;
    o3d.position.y = height / 2;
    o3d.position.z = centerY;
    o3d.rotateY(degreesToRadians(rotate));

    this.origin = o3d;
  }
  update(options) {
    const { width, height, depth, centerX, centerY, color, rotate, opacity } = options;
    this.origin.position.x = centerX;
    this.origin.position.y = height / 2;
    this.origin.position.z = centerY;
    this.origin.rotateion = new Euler(0, degreesToRadians(rotate), 0);
  }
}

const createDoorWindowModel = (wall, options) => {
  const { width, height, depth, centerX, centerY, border } = options;
  const { width: borderWidth, height: borderHeight, color: borderColor } = border;
  const geometry = new BoxGeometry(width, height, depth);
  const material = new MeshBasicMaterial({
    color: '#ff0',
    transparent: true,
    opacity: 1,
    side: DoubleSide
  });
  let door = new Mesh(geometry, material);
  door.name = wall.name;
  door.position.setX(centerX);
  door.position.setY(centerY);
  const borderGeometry = new BoxGeometry(width + borderWidth, height + borderHeight, depth);
  const borderMaterial = new MeshBasicMaterial({
    color: borderColor,
    transparent: true,
    opacity: 1,
    side: DoubleSide
  });
  let doorBorder = new Mesh(borderGeometry, borderMaterial);
  doorBorder.position.setX(centerX);
  doorBorder.position.setY(centerY);
  const newWall = OctreeCSG.meshSubtract(wall, doorBorder);
  newWall.name = wall.name;
  const newBorder = OctreeCSG.meshSubtract(doorBorder, door);
  newBorder.name = wall.name;

  return { wall: newWall, obj: door, border: newBorder };
};
