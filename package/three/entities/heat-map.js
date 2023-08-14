import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  CanvasTexture,
  BufferGeometry,
  PointsMaterial,
  Points,
  Vector3,
  AdditiveBlending
} from "three";

export const createHeatMap = (data, options) => {
  const { radius, width, height, bottom } = options;

  const texture = getHeatMapTexture(data, width, height, radius);
  const geometry = new PlaneGeometry(width, height);
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false
  });
  const mesh = new Mesh(geometry, material);
  mesh.position.z = bottom;
  return mesh;
};

const getHeatMapTexture = (data, width, height, radius) => {
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let context = canvas.getContext("2d");

  // 绘制透明度阶梯图
  let sum = 0;
  data.forEach(item => {
    sum += item.value;
  });
  const avg = sum / data.length;

  data.forEach(item => {
    const weight = item.value / avg;
    drawCircular(context, {
      x: item.x,
      y: item.y,
      radius,
      weight
    });
  });
  let imageData = context.getImageData(0, 0, width, height);

  // 温度调色板
  let palette = createPalette();
  // document.body.appendChild(palette.canvas);

  // 在温度调色板中进行颜色采样
  for (let i = 3; i < imageData.data.length; i += 4) {
    let alpha = imageData.data[i];
    let color = palette.pickColor(alpha);
    imageData.data[i - 3] = color[0];
    imageData.data[i - 2] = color[1];
    imageData.data[i - 1] = color[2];
  }

  context.putImageData(imageData, 0, 0);

  let heatMapTexture = new CanvasTexture(canvas);
  heatMapTexture.needsUpdate = true;
  return heatMapTexture;
};

const drawCircular = (context, opts) => {
  let { x, y, radius, weight } = opts;
  radius = parseInt(radius * weight);

  // 创建圆设置填充色
  let rGradient = context.createRadialGradient(x, y, 0, x, y, radius);
  rGradient.addColorStop(0, "rgba(255, 0, 0, 1)");
  rGradient.addColorStop(1, "rgba(0, 255, 0, 0)");
  context.fillStyle = rGradient;

  // 设置globalAlpha
  context.globalAlpha = weight;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.closePath();

  context.fill();
};

const createPalette = () => {
  //颜色条的颜色分布
  let colorStops = {
    1.0: "#f00",
    0.8: "#e2fa00",
    0.6: "#33f900",
    0.3: "#0349df",
    0.0: "#fff"
  };

  //颜色条的大小
  let width = 256,
    height = 10;

  // 创建canvas
  let paletteCanvas = document.createElement("canvas");
  paletteCanvas.width = width;
  paletteCanvas.height = height;
  paletteCanvas.style.position = "absolute";
  paletteCanvas.style.top = "0";
  paletteCanvas.style.right = "0";
  let ctx = paletteCanvas.getContext("2d");

  // 创建线性渐变色
  let linearGradient = ctx.createLinearGradient(0, 0, width, 0);
  for (const key in colorStops) {
    linearGradient.addColorStop(key, colorStops[key]);
  }

  // 绘制渐变色条
  ctx.fillStyle = linearGradient;
  ctx.fillRect(0, 0, width, height);

  let imageData = ctx.getImageData(0, 0, width, height).data;

  return {
    canvas: paletteCanvas,
    pickColor: function(position) {
      return imageData.slice(position * 4, position * 4 + 3);
    }
  };
};
