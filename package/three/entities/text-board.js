import {
  PlaneGeometry,
  Mesh,
  Object3D,
  CanvasTexture,
  MeshBasicMaterial
} from "three";

export const createTextBoard = options => {
  const {
    data,
    fontWeight,
    fontFamily = "宋体",
    fontSize,
    color = "#FFFFFF",
    opacity,
    width,
    height
  } = options;
  const o3d = new Object3D();
  data.forEach(item => {
    const { x, y, z, text } = item;
    const canvas = document.createElement("canvas");
    // canvas.style.background = "rgba(0,0,0,0)";
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textBaseLine = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, 64, 32);
    const geometry = new PlaneGeometry(width, height);
    const texture = new CanvasTexture(canvas);
    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      opacity
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, z);
    // mesh.rotation.z = Math.PI / 2;
    // mesh.rotation.y = Math.PI / 2;
    o3d.add(mesh);
  });
  return o3d;
};
