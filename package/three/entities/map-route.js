import { Line2 } from "../lib/lines/Line2";
import { LineMaterial } from "../lib/lines/LineMaterial";
import { LineGeometry } from "../lib/lines/LineGeometry";
// import { MeshLine, MeshLineMaterial } from "../lib/MeshLine";
import {
  CanvasTexture,
  CatmullRomCurve3,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Object3D,
  Path,
  TubeGeometry,
  Vector3,
  RepeatWrapping,
  Shape,
  ShapeGeometry,
  BufferGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Uint16BufferAttribute
} from "three";

// import { extrudePolygon } from "geometry-extrude";

export const createMapRoute = (data, options) => {
  const { color, dashed, lineWidth, dashScale, opacity, bottom } = options;
  const geometry = new LineGeometry();
  const positions = [];
  data.forEach(([x, y]) => {
    positions.push(x, y, bottom);
  });
  geometry.setPositions(positions);
  const material = new LineMaterial({
    color,
    linewidth: lineWidth,
    worldUnits: true,
    dashed,
    dashScale,
    transparent: true,
    opacity,
    depthTest: false
  });
  const line = new Line2(geometry, material);
  line.computeLineDistances();
  line.scale.set(1, 1, 1);
  return line;
};

export const createMapRoute2 = (data, options) => {
  const { color, dashed, lineWidth, dashScale, opacity, bottom } = options;
  const points = [];
  // const shape = new Shape();
  // data.forEach((point, idx) => {
  //   if (idx === 0) {
  //     shape.moveTo(...point);
  //   } else {
  //     shape.lineTo(...point);
  //   }
  // });

  data.forEach((point, idx) => {
    points.push(new Vector3(point[0], point[1], bottom));
  });
  const curve = new CatmullRomCurve3(points);
  const geometry = new TubeGeometry(curve, data.length, lineWidth, 2);
  // const geometry = new ShapeGeometry(shape);
  // const geometry = new ExtrudeGeometry(shape, {
  //   steps: 1,
  //   depth: 0,
  //   bevelEnabled: false,
  //   bevelSize: 0
  // });

  // const { indices, position, uv, normal } = extrudePolygon([[data]], {
  //   depth: 0
  // });
  // const geometry = new BufferGeometry();
  // geometry.setAttribute("position", new Float32BufferAttribute(position, 3));
  // geometry.setAttribute("normal", new Float32BufferAttribute(normal, 3));
  // geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  // geometry.setIndex(new Uint16BufferAttribute(indices, 1));
  const texture = getArrowTexture(color);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 2);
  const material = new MeshBasicMaterial({
    // wireframe: true,
    map: texture,
    color,
    transparent: true,
    opacity,
    depthTest: false
  });
  const mesh = new Mesh(geometry, material);
  // mesh.position.z = bottom;
  mesh.position.set(200, 200, 50);
  // mesh.rotation.x = Math.PI / 2;
  return mesh;
  // const points = [];
  // data.forEach((point, idx) => {
  //   points.push(new Vector3(point[0], point[1], bottom));
  // });
  // const meshLine = new MeshLine();
  // meshLine.setGeometry(points);
  // const texture = getArrowTexture(color);
  // texture.wrapS = texture.wrapT = RepeatWrapping;
  // texture.repeat.set(100, 2);
  // const material = new MeshLineMaterial({
  //   // color,
  //   // useMap: false,
  //   map: texture,
  //   useMap: true,
  //   lineWidth,
  //   dashArray: 0, // 破折号之间的长度和间距。(0 -无破折号)
  //   dashRatio: 0, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
  //   opacity,
  //   depthTest: false,
  //   transparent: true,
  //   dashOffset: 0
  // });

  // return new Mesh(meshLine.geometry, material);
};

const getArrowTexture = color => {
  const canvas = document.createElement("canvas");
  const width = 10,
    height = 20;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 10, 20);
  ctx.fillStyle = "#0f0";
  ctx.beginPath();
  ctx.moveTo(width / 2, height / 2);
  ctx.lineTo(0, 0);
  ctx.lineTo(width / 2, 0);
  ctx.lineTo(width, height / 2);
  ctx.lineTo(width / 2, height);
  ctx.lineTo(0, height);
  ctx.lineTo(width / 2, height / 2);
  ctx.closePath();
  ctx.fill();
  return new CanvasTexture(canvas);
};
