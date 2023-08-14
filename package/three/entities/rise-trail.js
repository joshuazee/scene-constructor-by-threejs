import {
  DoubleSide,
  Group,
  Mesh,
  RepeatWrapping,
  PlaneGeometry,
  MeshBasicMaterial,
  CanvasTexture
} from "three";
import { createLinearGradientCanvas } from "../util";

export const createRiseTrail = options => {
  const {
    count,
    width,
    height,
    color,
    bboxPosition,
    bbox,
    opacity,
    repeat
  } = options;
  const group = new Group();

  for (let i = 0; i < count; i++) {
    const geometry = new PlaneGeometry(width, height);
    const texture = new CanvasTexture(
      createLinearGradientCanvas(
        color,
        "rgba(0,0,0,0)",
        width,
        height,
        [width / 2, 0, width / 2, height * 0.75],
        [0, 0, width, height]
      )
    );
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, repeat);
    texture.offset.set(0, Math.random() * repeat);
    const material = new MeshBasicMaterial({
      map: texture,
      depthTest: false,
      transparent: true,
      opacity,
      side: DoubleSide
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(
      Math.random() * bbox[0] - bbox[0] / 2 + bboxPosition[0],
      Math.random() * bbox[1] - bbox[1] / 2 + bboxPosition[1],
      Math.random() * bbox[2] - bbox[2] / 2 + bboxPosition[2]
    );
    mesh.rotation.x = Math.PI / 2;
    group.add(mesh);
  }

  return group;
};
