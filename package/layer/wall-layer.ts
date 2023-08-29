import type { DoorWindowOptions, WallOptions } from 'pkg/types/three-map-layers';
import { BaseLayer } from './base-layer';
import {
  BoxGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Object3D,
  DoubleSide,
  Mesh
} from 'three';
import { degreesToRadians } from '@turf/helpers';
import OctreeCSG from 'pkg/lib/OctreeCSG/OctreeCSG.js';

export class WallLayer extends BaseLayer {
  constructor(options: WallOptions) {
    super(options);
    this.load(options);
  }
  load(options: WallOptions) {
    const o3d = new Object3D();
    const { width, height, depth, color, center, rotate, opacity, doors, windows } = options;
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

    o3d.position.x = center[0];
    o3d.position.y = height / 2;
    o3d.position.z = center[1];
    o3d.rotateY(degreesToRadians(rotate));

    this.origin = o3d;
  }
  update(options: WallOptions) {
    console.log(options);
  }
}

const createDoorWindowModel = (wall: Mesh, options: DoorWindowOptions) => {
  const { width, height, depth, center, border } = options;
  const { width: borderWidth, height: borderHeight, color: borderColor } = border;
  const geometry = new BoxGeometry(width, height, depth);
  const material = new MeshBasicMaterial({
    color: '#ff0',
    transparent: true,
    opacity: 1,
    side: DoubleSide
  });
  let door = new Mesh(geometry, material);
  door.position.setX(center[0]);
  door.position.setY(center[1]);
  const borderGeometry = new BoxGeometry(width + borderWidth, height + borderHeight, depth);
  const borderMaterial = new MeshBasicMaterial({
    color: borderColor,
    transparent: true,
    opacity: 1,
    side: DoubleSide
  });
  let doorBorder = new Mesh(borderGeometry, borderMaterial);
  doorBorder.position.setX(center[0]);
  doorBorder.position.setY(center[1]);
  const newWall = OctreeCSG.meshSubtract(wall, doorBorder);
  const newBorder = OctreeCSG.meshSubtract(doorBorder, door);

  return { wall: newWall, obj: door, border: newBorder };
};
