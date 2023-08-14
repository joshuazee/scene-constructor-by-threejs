import { Object3D, BoxGeometry, MeshPhongMaterial, Mesh } from "three";

export const createBarBoard = (data, options) => {
  const {
    openBar,
    width,
    minHeight,
    maxHeight,
    bottom,
    color,
    opacity,
    valueTail,
    elements
  } = options;
  const heightFactor = maxHeight - minHeight;
  let minValue = Number.MAX_VALUE;
  let maxValue = Number.MIN_VALUE;
  data.forEach(item => {
    minValue > item.value && (minValue = item.value);
    maxValue < item.value && (maxValue = item.value);
  });
  const valueFactor = maxValue - minValue;
  const o3d = new Object3D();
  data.forEach(item => {
    const height =
      valueFactor > 0
        ? ((item.value - minValue) / valueFactor) * heightFactor + minHeight
        : maxHeight;
    if (openBar === true) {
      const bar = createBar({
        position: [item.x, item.y],
        color,
        bottom,
        width,
        height,
        opacity
      });
      o3d.add(bar);
    }

    const board = createBoard({
      label: item.label,
      tail: valueTail,
      value: item.value,
      x: item.x,
      y: item.y,
      z: openBar ? (bottom + height) * 1.1 : bottom * 1.15
    });
    elements.push(board);
  });
  return o3d;
};

const createBar = ({ position, width, height, color, bottom, opacity }) => {
  const geometry = new BoxGeometry(width, width, height);
  const material = new MeshPhongMaterial({
    color,
    transparent: true,
    opacity
  });
  const mesh = new Mesh(geometry, material);
  mesh.position.set(position[0], position[1], bottom + height / 2);
  mesh.rotation.set(0, 0, Math.PI * 0.3);
  return mesh;
};

const createBoard = options => {
  const { value, tail, label } = options;
  const el = createBoardBase(options);
  el.style.flexDirection = "column";

  const labelSpan = document.createElement("span");
  labelSpan.innerText = label;
  const valueSpan = document.createElement("span");
  valueSpan.innerText = value + tail;
  el.appendChild(labelSpan);
  el.appendChild(valueSpan);
  return el;
};

export const createBoardBase = options => {
  const { x, y, z } = options;
  const el = document.createElement("div");
  el.dataset.x = x;
  el.dataset.y = y;
  el.dataset.z = z;
  el.style.position = "absolute";
  el.style.display = "flex";
  el.style.pointerEvents = "none";
  el.style.whiteSpace = "nowrap";
  el.style.visibility = "hidden";
  return el;
};

export const setBoardStyle = (el, options) => {
  const {
    fontFamily,
    fontSize,
    fontWeight,
    color,
    lineHeight,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderWidth,
    borderColor,
    borderStyle,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    background
  } = options;
  el.style.fontFamily = fontFamily;
  el.style.fontSize = fontSize + "px";
  el.style.fontWeight = fontWeight;
  el.style.color = color;
  el.style.lineHeight = lineHeight + "px";
  el.style.borderTopLeftRadius = borderTopLeftRadius + "px";
  el.style.borderTopRightRadius = borderTopRightRadius + "px";
  el.style.borderBottomLeftRadius = borderBottomLeftRadius + "px";
  el.style.borderBottomRightRadius = borderBottomRightRadius + "px";
  el.style.borderWidth = borderWidth + "px";
  el.style.borderColor = borderColor;
  el.style.borderStyle = borderStyle;
  el.style.paddingLeft = paddingLeft + "px";
  el.style.paddingRight = paddingRight + "px";
  el.style.paddingTop = paddingTop + "px";
  el.style.paddingBottom = paddingBottom + "px";
  el.style.background = background;
};
