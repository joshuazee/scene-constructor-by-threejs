import {
  Object3D,
  TextureLoader,
  PlaneGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Mesh,
  FrontSide,
  AdditiveBlending,
  RepeatWrapping,
  Vector2,
  BufferGeometry,
  Vector3,
  Float32BufferAttribute,
  DoubleSide,
  Group,
  CylinderGeometry,
  Sprite,
  SpriteMaterial,
  CircleGeometry,
  RingGeometry,
  CanvasTexture
} from "three";
import { createLinearGradientCanvas } from "../util";

export const createLightCross = options => {
  const { width, height, bottomImg, img, positions } = options;
  const o3d = new Object3D();
  const loader = new TextureLoader();
  if (img) {
    const imgTexture = loader.load(img);
    imgTexture.wrapS = RepeatWrapping;
    imgTexture.wrapT = RepeatWrapping;
    imgTexture.center = new Vector2(0.5, 0.5);
    imgTexture.rotation = Math.PI;
    const bottomTexture = bottomImg ? loader.load(bottomImg) : undefined;
    positions.forEach(position => {
      const topPlane = new PlaneGeometry(width, height);
      // const cone = new ConeGeometry(width, height, 12); // createCone(width, height, 12);
      // const cone1 = new ConeGeometry(width, height, 4);
      // console.log(cone1.getAttribute("position"));
      const material = new MeshBasicMaterial({
        map: imgTexture,
        transparent: true,
        side: DoubleSide,
        blending: AdditiveBlending,
        depthTest: false
      });
      const topMesh = new Mesh(topPlane, material);
      topMesh.position.set(position[0], position[1], position[2] + height / 2);
      topMesh.rotation.x = Math.PI / 2;
      o3d.add(topMesh);
      const cloneMesh = topMesh.clone();
      cloneMesh.rotation.y = Math.PI / 2;
      o3d.add(cloneMesh);
      if (bottomTexture) {
        const bottomGeometry = new PlaneGeometry(width, width);
        const bottomMaterial = new MeshBasicMaterial({
          map: bottomTexture,
          side: FrontSide
        });
        const bottomMesh = new Mesh(bottomGeometry, bottomMaterial);
        bottomMesh.position(position[0], position[1], position[2] + height / 2);
        o3d.add(bottomMesh);
      }
    });
  } else {
    throw "img is required";
  }
  return o3d;
};

export const createLightCross2 = (data, options) => {
  const {
    lightRadius,
    lightHeight,
    lightColor,
    bottomRadius,
    bottomColor,
    bottomRingCount = 3
  } = options;
  const group = new Group();
  const textureWidth = 50;
  const textureHeight = textureWidth * 2;
  const lightTexture = new CanvasTexture(
    createLinearGradientCanvas(
      `rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${lightColor.a})`,
      `rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, 0)`,
      textureWidth,
      textureHeight,
      [
        textureWidth / 2,
        textureHeight,
        textureWidth / 2,
        0
        // 0.75 * textureHeight - textureHeight
      ],
      [0, 0, textureWidth, textureHeight]
    )
  );
  // lightTexture.wrapS = lightTexture.wrapT = RepeatWrapping;
  // lightTexture.repeat.set(2, 1);
  const o3d = new Object3D();
  const lightGeometry = new CylinderGeometry(
    lightRadius,
    lightRadius,
    lightHeight,
    30,
    1,
    true
  );
  const lightMaterial = new MeshBasicMaterial({
    map: lightTexture,
    transparent: true,
    opacity: 1,
    depthTest: false
  });
  const light = new Mesh(lightGeometry, lightMaterial);
  light.rotation.x = Math.PI / 2;
  light.position.z = lightHeight / 2;
  o3d.add(light);
  const bottomOptions = {
    center: {
      radius: bottomRadius,
      color: "#FFFFFF",
      opacity: 0.8
    },
    rings: []
  };
  for (let i = 1; i <= bottomRingCount; i++) {
    const color = bottomColor;
    const opacity = 1 - i * 0.3;
    bottomOptions.rings.push({
      innerRadius: bottomRadius * i,
      outerRadius: bottomRadius * (i + 1),
      color,
      opacity
    });
  }
  const bottom = createLightRingBottom(bottomOptions);
  o3d.add(bottom);
  data.forEach(item => {
    const lightCross = o3d.clone();
    lightCross.position.set(item[0], item[1], item[2]);
    group.add(lightCross);
  });

  return group;
};

const createLightRingBottom = options => {
  const group = new Group();
  const { center, rings } = options;
  const { segments = 30, radius, color = 0xffffff, opacity = 1 } = center;
  const centerGeometry = new CircleGeometry(radius, segments);
  const centerMaterial = new MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthTest: false
  });
  const centerMesh = new Mesh(centerGeometry, centerMaterial);
  group.add(centerMesh);
  rings.forEach(ring => {
    const { innerRadius, outerRadius, segments = 30, color, opacity } = ring;
    const ringGeometry = new RingGeometry(
      innerRadius,
      outerRadius,
      segments,
      1
    );
    const ringMaterial = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthTest: false
    });
    const ringMesh = new Mesh(ringGeometry, ringMaterial);
    group.add(ringMesh);
  });
  return group;
};

const createCone = (radius, height, segments) => {
  const geometry = new BufferGeometry();
  const vertices = [0, height / 2, 0];
  const indices = [];
  const uvs = [0.5, 1];
  for (let x = 0; x <= segments; x++) {
    const vertex = new Vector3();
    const u = x / segments;

    const theta = u * Math.PI * 2;

    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    // vertex

    vertex.x = radius * sinTheta;
    vertex.y = -height / 2;
    vertex.z = radius * cosTheta;
    vertices.push(vertex.x, vertex.y, vertex.z);

    // index
    indices.push(0, x + 1, x + 2);

    // uv
    // const uvIdx = x % 4;
    x % 2 === 0 ? uvs.push(0, 0) : uvs.push(1, 0);
  }
  geometry.setIndex(indices);
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));

  return geometry;
};
