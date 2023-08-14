import {
  BufferGeometry,
  BufferAttribute,
  DoubleSide,
  Group,
  Line3,
  Mesh,
  Object3D,
  Path,
  Vector2,
  Vector3,
  CubicBezierCurve3,
  CanvasTexture,
  RepeatWrapping,
  TubeGeometry,
  Euler,
  Points,
  ShaderMaterial,
  EllipseCurve,
  MathUtils as TMath
} from "three";
import { MeshLine, MeshLineMaterial } from "../lib/MeshLine";

export const createLightTrails = options => {
  const { data, startColor, endColor, lineWidth, dashArray } = options;
  const group = new Object3D();
  data.forEach(item => {
    const points = createTrailPath(item.startPoint, item.endPoint);
    const geometry = new BufferGeometry();
    geometry.setFromPoints(points);
    const meshLine = new MeshLine();
    meshLine.setGeometry(geometry);
    const texture = createTexture(startColor, endColor);
    const material = new MeshLineMaterial({
      map: texture,
      useMap: true,
      lineWidth,
      dashArray, // 破折号之间的长度和间距。(0 -无破折号)
      dashRatio: 0.5, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
      opacity: 1,
      transparent: true,
      dashOffset: 0,
      sizeAttenuation: 1
    });
    const mesh = new Mesh(meshLine.geometry, material);
    group.add(mesh);
  });
  return group;
};

const createTrailPath = (p1, p2) => {
  const segments = 30;
  const line = new Line3(new Vector3(...p1), new Vector3(...p2));
  const radius = line.distance() / 2;
  const h = (3 / 2) * radius;
  const curve = new CubicBezierCurve3(
    new Vector3(...p2),
    new Vector3(p2[0], p2[1], h),
    new Vector3(p1[0], p1[1], h),
    new Vector3(...p1)
  );
  return curve.getPoints(30);
};

const createTexture = (color1, color2) => {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 10;
  const ctx = canvas.getContext("2d");
  const grd1 = ctx.createLinearGradient(0, 5, 128, 5);
  grd1.addColorStop(0, color2);
  grd1.addColorStop(1, color1);
  ctx.fillStyle = grd1;
  ctx.fillRect(0, 0, 128, 10);
  return new CanvasTexture(canvas);
};

export const createLightTrails2 = (data, options) => {
  const { color, lineWidth, lineLength } = options;
  const group = new Object3D();
  data.forEach(item => {
    const curve = createTrailPath2(item.startPoint, item.endPoint);
    const lightTrail = createFlyLine(
      curve,
      {
        speed: 0.1,
        color: color,
        number: 0.5,
        length: lineLength,
        size: lineWidth
      },
      2000
    );
    // const vecP = new Vector3(
    //   item.endPoint[0] - item.startPoint[0],
    //   item.endPoint[1] - item.startPoint[0],
    //   item.endPoint[2] - item.startPoint[2]
    // );
    // const vecX = new Vector3(1, 0, 0);
    // const rotation = vecP.angleTo(vecX);
    // console.log(rotation, TMath.radToDeg(rotation));

    // const euler = new Euler(Math.PI / 2, -TMath.degToRad(30), 0);
    // lightTrail.setRotationFromEuler(euler);
    // const center = [
    //   (item.startPoint[0] + item.endPoint[0]) / 2,
    //   (item.startPoint[1] + item.endPoint[1]) / 2,
    //   (item.startPoint[2] + item.endPoint[2]) / 2
    // ];
    // lightTrail.position.set(...center);
    group.add(lightTrail);
  });
  return group;
};

// const distance = (p1, p2) => {
//   return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
// };

// 圆形路径
const createTrailPath2 = (p1, p2) => {
  // const vecP1 = new Vector3(...p1);
  // const vecP2 = new Vector3(...p2);
  // let xRadius = vecP1.distanceTo(vecP2) / 2;
  // // console.log(xRadius);
  // // xRadius = distance(p1, p2);
  // // console.log(xRadius);
  // const yRadius = (xRadius * 2) / 3;
  // // const center = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  // let clockWise = false;
  // let startAngle = 0;
  // let endAngle = Math.PI;
  // if (p1[0] <= p2[0]) {
  //   clockWise = true;
  //   startAngle = Math.PI;
  //   endAngle = 0;
  // }

  // const curve = new EllipseCurve(
  //   0,
  //   0,
  //   xRadius,
  //   yRadius,
  //   startAngle,
  //   endAngle,
  //   clockWise
  // );
  const line = new Line3(new Vector3(...p1), new Vector3(...p2));
  const radius = line.distance() / 2;
  const h = (3 / 2) * radius;
  const curve = new CubicBezierCurve3(
    new Vector3(...p1),
    new Vector3(p1[0], p1[1], h),
    new Vector3(p2[0], p2[1], h),
    new Vector3(...p2)
  );
  return curve;
};

export const createFlyLine = (curve, matSetting, pointsNumber) => {
  const points = curve.getPoints(pointsNumber);
  const geometry = new BufferGeometry();
  geometry.setFromPoints(points);

  let length = points.length;
  const percents = new Float32Array(length);
  for (let i = 0; i < points.length; i++) {
    percents[i] = i / length;
  }

  geometry.setAttribute("percent", new BufferAttribute(percents, 1));

  let lineMaterial = initLineMaterial(matSetting);

  const flyLine = new Points(geometry, lineMaterial);
  // let euler = new Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  // flyLine.setRotationFromEuler(euler);
  return flyLine;
};

const initLineMaterial = setting => {
  let number = setting ? Number(setting.number) || 1.0 : 1.0;
  let speed = setting ? Number(setting.speed) || 1.0 : 1.0;
  let length = setting ? Number(setting.length) || 0.5 : 0.5;
  let size = setting ? Number(setting.size) || 3.0 : 3.0;
  let color = setting
    ? new Vector3(setting.color.r, setting.color.g, setting.color.b) ||
      new Vector3(0, 1, 1)
    : new Vector3(0, 1, 1);
  let singleUniforms = {
    u_time: { type: "f", value: 0.0 },
    number: { type: "f", value: number },
    speed: { type: "f", value: speed },
    length: { type: "f", value: length },
    size: { type: "f", value: size },
    color: { type: "v3", value: color }
  };
  let lineMaterial = new ShaderMaterial({
    uniforms: singleUniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
    //blending:THREE.AdditiveBlending,
  });
  return lineMaterial;
};

export const vertexShader =
  "varying vec2 vUv;" +
  "attribute float percent;" +
  "uniform float u_time;" +
  "uniform float number;" +
  "uniform float speed;" +
  "uniform float length;" +
  "varying float opacity;" +
  "uniform float size;" +
  "void main()" +
  "{" +
  "vUv = uv;" +
  "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );" +
  "float l = clamp(1.0-length,0.0,1.0);" +
  "gl_PointSize = clamp(fract(percent*number + l - u_time*number*speed)-l ,0.0,1.) * size * (1./length);" +
  "opacity = gl_PointSize/size;" +
  "gl_Position = projectionMatrix * mvPosition;" +
  "}";
export const fragmentShader =
  "precision mediump float;" +
  "varying float opacity;" +
  "uniform vec3 color;" +
  "void main(){" +
  "if(opacity <=0.2){" +
  "discard;" +
  "}" +
  "    gl_FragColor = vec4(color,1.0);" +
  "}";
