import {
  Mesh,
  TextureLoader,
  MeshBasicMaterial,
  PlaneGeometry,
  Object3D,
} from "three";

export const createBottomAnimation = (width) => {
  const loader = new TextureLoader();
  const container = new Object3D();
  loader.load(require("@/assets/img/three/circle_in.png"), (texture) => {
    container.add(createPlaneAnimation(texture, width));
  });
  loader.load(require("@/assets/img/three/circle_out.png"), (texture) => {
    container.add(createPlaneAnimation(texture, width * 1.2));
  });

  return container;
};

const createPlaneAnimation = (texture, width) => {
  const plane = new PlaneGeometry(width, width);
  // this.plane2.rotateY((90 / 180) * Math.PI)
  const material = new MeshBasicMaterial({
    map: texture,
    side: 2,
    transparent: true,
    opacity: 1,
    depthTest: false,
  });
  return new Mesh(plane, material);
};
