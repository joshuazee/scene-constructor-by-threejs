import {
  BufferGeometry,
  Mesh,
  // Line,
  // LineBasicMaterial,
  Object3D,
  Vector2
} from "three";
import { MeshLine, MeshLineMaterial } from "../lib/MeshLine";
import { gradientColors2 } from "../util";
import { createColorShape } from "./color-shape";

export const createRegionHeat = options => {
  const {
    data,
    boundaries,
    segments,
    colors,
    opacity,
    height,
    defaultColor,
    defaultOpacity,
    outlineColor,
    outlineOpacity
  } = options;
  const o3d = new Object3D();
  let minValue = Number.MAX_VALUE;
  let maxValue = Number.MIN_VALUE;
  data.forEach(item => {
    item.value < minValue && (minValue = item.value);
    item.value > maxValue && (maxValue = item.value);
  });
  const valueRange = maxValue - minValue;
  const steps = [];
  for (let i = 0; i < segments; i++) {
    steps.push({
      min: minValue + (valueRange / segments) * i,
      max: minValue + (valueRange / segments) * (i + 1)
    });
  }
  steps[steps.length - 1].max += 0.01;
  const colorSegments = gradientColors2(colors, segments, 1);
  boundaries.forEach(boundary => {
    const region = data.find(item => item.name === boundary.properties.NAME);
    let color = defaultColor;
    let useOpacity = defaultOpacity;
    if (region) {
      const value = region.value;
      color =
        colorSegments[
          steps.findIndex(item => value >= item.min && value < item.max)
        ];
      useOpacity = opacity;
    }
    const shape = createColorShape(
      boundary.geometry.coordinates[0][0],
      height,
      color,
      useOpacity
    );
    const outline = createOutline(
      boundary.geometry.coordinates[0][0],
      height,
      outlineColor,
      outlineOpacity
    );
    shape.add(outline);
    o3d.add(shape);
  });
  return o3d;
};

const createOutline = (coordinates, height, color, opacity) => {
  const vertices = [];
  coordinates.forEach(coordinate => {
    vertices.push(new Vector2(...coordinate));
  });
  const geometry = new BufferGeometry();
  geometry.setFromPoints(vertices);
  const line = new MeshLine();
  line.setGeometry(geometry);
  const material = new MeshLineMaterial({
    color,
    useMap: false,
    lineWidth: 1,
    dashArray: 0, // 破折号之间的长度和间距。(0 -无破折号)
    dashRatio: 0.5, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
    opacity,
    transparent: true,
    dashOffset: 0,
    sizeAttenuation: 1
  });
  return new Mesh(line.geometry, material);
};
