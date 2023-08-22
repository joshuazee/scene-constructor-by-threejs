import type { WindowOptions, DoorOptions, WallOptions } from 'pkg/types/three-map-layers';
import { BaseLayer } from './base-layer';
import { BoxGeometry, MeshBasicMaterial, Object3D, DoubleSide, Mesh } from 'three';
import { degreesToRadians } from '@turf/helpers';
import * as THREE from 'three';
import jthreebsp from 'jthreebsp';
const ThreeBSP = jthreebsp(THREE);

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
    wall.position.x = center[0];
    wall.position.y = height / 2;
    wall.position.z = center[1];
    wall.rotateY(degreesToRadians(rotate));

    if (doors && doors.length > 0) {
      doors.forEach((door) => {
        const result = createDoorModel(wall, door);
        wall = result.wall;
        o3d.add(result.door, result.border);
      });
    }

    if (windows && windows.length > 0) {
      windows.forEach((window) => {
        const result = createWindowModel(wall, window);
        wall = result.wall;
        o3d.add(result.door, result.border);
      });
    }

    o3d.add(wall);

    this.origin = o3d;
  }
  unload() {}
}

const createDoorModel = (wall: Mesh, options: DoorOptions) => {
  const wallBSP = new ThreeBSP(wall);
  const { width, height, depth, center, border } = options;
  const {
    width: borderWidth,
    height: borderHeight,
    depth: borderDepth,
    color: borderColor
  } = border;
  const geometry = new BoxGeometry(width, height, depth);
  const material = new MeshBasicMaterial({
    color: '#ff0',
    transparent: true,
    opacity: 1,
    side: DoubleSide
  });
  let door = new Mesh(geometry, material);
  const doorBSP = new ThreeBSP(door);
  const borderGeometry = new BoxGeometry(
    width + borderWidth,
    height + borderHeight,
    depth + borderDepth
  );
  const borderMaterial = new MeshBasicMaterial({
    color: borderColor,
    transparent: true,
    opacity: 1,
    side: DoubleSide
  });
  let doorBorder = new Mesh(borderGeometry, borderMaterial);
  const borderBSP = new ThreeBSP(doorBorder);
  const newWall = wallBSP.subtract(borderBSP);
  doorBorder = borderBSP.subtract(doorBSP);
  return { wall: newWall, door: door, border: doorBorder };
};

const createWindowModel = (wall: Mesh, options: WindowOptions) => {
  const wallBSP = ThreeBSP(wall);
  const { width, height, depth, center, border } = options;
  const { width: borderWidth, height: borderHeight, depth: borderDepth } = border;
  const geometry = new BoxGeometry(width, height, depth);
  const material = new MeshBasicMaterial();
  let door = new Mesh(geometry, material);
  const doorBSP = new ThreeBSP(door);
  const borderGeometry = new BoxGeometry(
    width + borderWidth,
    height + borderHeight,
    depth + borderDepth
  );
  const borderMaterial = new MeshBasicMaterial();
  let doorBorder = new Mesh(borderGeometry, borderMaterial);
  const borderBSP = new ThreeBSP(doorBorder);
  const newWall = wallBSP.subtract(borderBSP);
  doorBorder = borderBSP.subtract(doorBSP);
  return { wall: newWall, door: door, border: doorBorder };
};
