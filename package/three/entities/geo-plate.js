import {
  BufferGeometry,
  ExtrudeGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Group,
  Shape,
  Vector2
} from "three";
import { MeshLine, MeshLineMaterial } from "../lib/MeshLine";
import { CSS2DObject } from "../lib/CSS2DRenderer";

export const createGeoPlate = (data, options) => {
  const group = new Group();
  const {
    depth,
    topColor,
    topOpacity,
    sideColor,
    sideOpacity,
    lineColor,
    lineWdith
  } = options;
  const o3dPlate = new Object3D();
  const o3dLine = new Object3D();
  data.forEach((item) => {
    let xSum = 0,
      ySum = 0;
    const points = item.points.map((point) => {
      xSum += point[0];
      ySum += point[1];
      return new Vector2(...point);
    });
    const shape = new Shape(points);
    const plate = createPlateExtrude(shape, {
      depth,
      topColor,
      topOpacity,
      sideColor,
      sideOpacity,
      properties: item.properties,
      shapeCenter: [xSum / points.length, ySum / points.length]
    });
    o3dPlate.add(plate);
    const lineGeometry = new BufferGeometry();
    lineGeometry.setFromPoints(points);
    const line = createPlateOutline(lineGeometry, {
      color: lineColor,
      lineWidth: lineWdith,
      opacity: 1
    });
    line.position.z = depth;
    o3dLine.add(line);
  });
  group.add(o3dPlate);
  group.add(o3dLine);
  return group;
};

const createPlateExtrude = (shape, options) => {
  const {
    depth,
    topColor = "#02A1E2",
    topOpacity = 1,
    sideColor = "#02A1E2",
    sideOpacity = 1,
    properties,
    shapeCenter
  } = options;
  const extrudeSettings = {
    depth,
    bevelEnabled: false
  };
  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  geometry.computeBoundingBox();
  const topMaterial = new MeshBasicMaterial({
    color: topColor,
    transparent: true,
    opacity: topOpacity
  });
  const sideMaterial = new MeshBasicMaterial({
    color: sideColor,
    transparent: true,
    opacity: sideOpacity
  });
  const mesh = new Mesh(geometry, [topMaterial, sideMaterial]);
  if (properties["NAME"]) {
    const label = createNameLabel(properties["NAME"], shapeCenter, depth);
    mesh.add(label);
  }
  mesh.properties = properties;
  return mesh;
};

export const createNameLabel = (text, center, height) => {
  // const el = document.createElement("div");
  // el.style.display = "flex";
  // el.style.flexDirection = "column";
  // el.style.alignItems = "center";
  // el.style.position = "absolute";
  // el.style.background = "#000";
  const label = document.createElement("div");
  label.textContent = text;
  label.style.color = "#FFF";
  // el.appendChild(label);
  // const img = document.createElement("img");
  // img.src = "img/three-map-icon.png";
  // img.style.width = "28px";
  // img.style.height = "22px";
  // img.style.marginTop = "-10px";
  // el.appendChild(img);

  const obj = new CSS2DObject(label);
  obj.position.set(...center, height);
  return obj;
};

const createPlateOutline = (geometry, options = {}) => {
  const { color = "white", lineWidth = 1, opacity = 1 } = options;
  const meshLine = new MeshLine();
  meshLine.setGeometry(geometry);
  const material = new MeshLineMaterial({
    color,
    useMap: false,
    lineWidth,
    // resolution: resolution,
    dashArray: 0, // 破折号之间的长度和间距。(0 -无破折号)
    dashRatio: 0.5, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
    opacity,
    transparent: true,
    dashOffset: 0,
    sizeAttenuation: 1 //使线宽不变，不管距离(1个单位是屏幕上的1px)(0 -衰减，1 -不衰减)
    // side: FrontSide,
    // blending: AdditiveBlending
  });
  return new Mesh(meshLine.geometry, material);
};
