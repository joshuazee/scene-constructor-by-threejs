import {
  BufferGeometry,
  PointsMaterial,
  TextureLoader,
  Vector3,
  AdditiveBlending,
  Points
} from "three";

const pointsImageUrl = require("@/assets/img/three/points-sprites.png");
export const createPointsSprites = options => {
  const { color, count, bboxPosition, bbox, size, opacity } = options;
  const loader = new TextureLoader();
  const texture = loader.load(pointsImageUrl);
  const geometry = new BufferGeometry();
  const vertices = [];
  for (let i = 0; i < count; i++) {
    vertices.push(
      new Vector3(
        Math.random() * bbox[0] - bbox[0] / 2,
        Math.random() * bbox[1] - bbox[1] / 2,
        Math.random() * bbox[2] - bbox[2] / 2
      )
    );
  }
  geometry.setFromPoints(vertices);
  const material = new PointsMaterial({
    color,
    size,
    map: texture,
    blending: AdditiveBlending,
    depthTest: false,
    transparent: true,
    opacity
  });
  const points = new Points(geometry, material);
  points.position.x = bboxPosition[0];
  points.position.y = bboxPosition[1];
  points.position.z = bboxPosition[2];

  return points;
};
