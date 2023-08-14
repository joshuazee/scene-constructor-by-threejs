import {
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Shape,
  ShapeGeometry,
  Vector2
} from "three";

export const createColorShape = (coordinates, height, color, opacity) => {
  const vertices = [];
  coordinates.forEach(coordinate => {
    vertices.push(new Vector2(...coordinate));
  });
  const shape = new Shape(vertices);
  const geometry = new ShapeGeometry(shape);
  const material = new MeshBasicMaterial({
    color,
    depthTest: false,
    transparent: true,
    opacity,
    side: FrontSide
  });
  const mesh = new Mesh(geometry, material);
  mesh.position.z = height;
  return mesh;
};

export const createGradientColorShape = (
  coordinates,
  height,
  startColor,
  endColor
) => {};
