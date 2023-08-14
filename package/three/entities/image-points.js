import {
  ConeGeometry,
  Group,
  Mesh,
  MeshPhongMaterial,
  CanvasTexture,
  MeshBasicMaterial,
  PlaneGeometry
} from "three";
import { createBoardBase } from "./bar-board";

export const createImagePoints = (data, options) => {
  const {
    type = "pentahedron",
    color,
    width,
    opacity,
    bottomRadius,
    bottomLineWidth,
    bottomLineColor,
    bottomLineStep
  } = options;
  const group = new Group();
  const elements = [];
  data.forEach(item => {
    let g = new Group();
    switch (type) {
      case "pentahedron": {
        const o3d = createPentahedron(width, width * 2, color, opacity);
        o3d.rotation.x = -Math.PI / 2;
        o3d.userData = item.properties;
        g.add(o3d);
        break;
      }
    }
    const bottom = createBottom(
      bottomRadius,
      bottomLineWidth,
      bottomLineColor,
      bottomLineStep
    );
    bottom.position.z = -width;
    bottom.rotation.z = Math.random();
    bottom.userData = item.properties;
    g.add(bottom);
    g.position.set(item.x, item.y, item.z);
    //set el properties
    // elements.push(createBoard(item, width));
    group.add(g);
  });
  return { model: group, elements };
};

const createPentahedron = (width, height, color, opacity) => {
  const geometry = new ConeGeometry(width, height, 4);
  const material = new MeshPhongMaterial({
    color,
    transparent: true,
    opacity
    // depthTest: false
  });
  return new Mesh(geometry, material);
};

const createBottom = (bottomRadius, lineWidth, lineColor, lineStep = 4) => {
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  const count = Math.floor(360 / lineStep);
  lineStep = (count / 180) * Math.PI;
  for (
    let b = 0, e = lineStep / 2;
    e <= Math.PI * 2;
    b += lineStep, e += lineStep
  ) {
    ctx.beginPath();
    ctx.arc(50, 50, 50 - lineWidth, b, e);
    ctx.stroke();
  }
  // document.body.appendChild(canvas);
  const texture = new CanvasTexture(canvas);
  const material = new MeshBasicMaterial({
    map: texture,
    depthTest: false,
    transparent: true
  });
  const geometry = new PlaneGeometry(bottomRadius, bottomRadius);
  return new Mesh(geometry, material);
};

export const createBoard = (item, width) => {
  const el = createBoardBase({
    x: item.x,
    y: item.y,
    z: (item.z + width) * 1.1
  });
  el.style.flexDirection = "column";
  const keys = Object.keys(item.properties);
  keys.forEach(key => {
    el.dataset[key] = item.properties[key];
  });
  return el;
};
