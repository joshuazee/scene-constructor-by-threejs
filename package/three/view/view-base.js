import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  AxesHelper,
  Color as TColor,
  Raycaster,
  Vector2
} from 'three';
// import { CSS2DRenderer } from '../lib/CSS2DRenderer';
// import { MapControls, OrbitControls } from '../lib/controls/OrbitControls';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { MapControls } from 'three/addons/controls/MapControls';
export default class ViewBase {
  constructor(options = {}) {
    const {
      target,
      width = 400,
      height = 300,
      showAxesHelper = true,
      axesHelperWidth = 100,
      mouseInteraction = true,
      interActionType = 0,
      cssRenderer = false
    } = options;
    if (!target) {
      throw 'target is requied';
    }
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(new TColor(0x000000), 0);
    target.appendChild(this.renderer.domElement);
    if (cssRenderer === true) {
      this.renderer2 = new CSS2DRenderer();
      this.renderer2.setSize(width, height);
      this.renderer2.domElement.style.position = 'absolute';
      this.renderer2.domElement.style.top = 0;
      this.renderer2.domElement.style.pointerEvents = 'none';
      target.appendChild(this.renderer2.domElement);
    }

    this.camera = new PerspectiveCamera(75, width / height, 1, width * 2);
    this.camera.lookAt(0, 0, 0);
    this.camera.position.set(100, 100, 100);

    this.scene = new Scene();

    if (mouseInteraction) {
      if (interActionType === 1) {
        this.controls = new MapControls(this.camera, this.renderer.domElement);
      } else {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement); //创建控件对象
      }
    }

    // if (showAxesHelper === true) {
    const axes = new AxesHelper(axesHelperWidth);
    axes.visible = showAxesHelper;
    this.axesHelper = axes;
    this.scene.add(axes);
    // }

    this.raycaster = new Raycaster();

    // this.update(options);
  }
  animate(callback) {
    requestAnimationFrame(() => {
      this.animate(callback);
    });

    this.render();

    callback && callback();
  }
  render() {
    this.renderer.render(this.scene, this.camera);
    this.renderer2 && this.renderer2.render(this.scene, this.camera);
  }
  setBackground({ color = 'black', alpha = 1 }) {
    this.renderer.setClearColor(new TColor(color), alpha);
  }
  setInteraction({ draggable = true, zoomable = true }) {
    this.controls.enablePan = draggable;
    this.controls.enableRotate = draggable;
    this.controls.enableZoom = zoomable;
  }
  onClick(callback) {
    this.pick({ type: 0, callback }, this.scene.children);
  }
  onPointMove(callback) {
    this.pick({ type: 1, callback }, this.scene.children);
  }
  pick(options, models) {
    const { type = 0, callback } = options;

    this.infowinKey && unByKey(this.infowinKey);
    // !this.raycaster && (this.raycaster = new Raycaster());
    !this.rcp && (this.rcp = new Vector2());
    this.infowinKey = on(this.renderer.domElement, type === 0 ? 'click' : 'mousemove', (event) => {
      this.rcp.x = (event.offsetX / this.renderer.domElement.width) * 2 - 1;
      this.rcp.y = -(event.offsetY / this.renderer.domElement.height) * 2 + 1;
      // 通过摄像机和鼠标位置更新射线
      this.raycaster.setFromCamera(this.rcp, this.camera);

      // 计算物体和射线的焦点
      const intersects = this.raycaster.intersectObjects(models);
      typeof callback === 'function' && callback(intersects);
    });
  }
  update(options) {
    console.log(options);
    const { showAxesHelper } = options;
    this.axesHelper.visible = showAxesHelper;
  }
  // setInteractiveHandle(models, options) {
  //   const { type, callback } = options;
  //   this.intKey && unByKey(this.intKey);
  //   // !this.raycaster && (this.raycaster = new Raycaster());
  //   !this.rcp4Int && (this.rcp4Int = new Vector2());
  //   this.intKey = on(this.renderer.domElement, type, (event) => {
  //     this.rcp4Int.x = (event.offsetX / this.renderer.domElement.width) * 2 - 1;
  //     this.rcp4Int.y = -(event.offsetY / this.renderer.domElement.height) * 2 + 1;
  //     // 通过摄像机和鼠标位置更新射线
  //     this.raycaster.setFromCamera(this.rcp4Int, this.camera);

  //     // 计算物体和射线的焦点
  //     const intersects = this.raycaster.intersectObjects(models);
  //     typeof callback === 'function' && callback(intersects);
  //   });
  // }
}

const events = {};
const on = (target, eventType, listener) => {
  let key = new Date().now;
  target.addEventListener(eventType, listener);
  events[key] = {
    target,
    eventType,
    listener
  };
  return key;
};

const unByKey = (key) => {
  if (events.hasOwnProperty(key)) {
    const eventObj = events[key];
    const { target, eventType, listener } = eventObj;
    target.removeEventListener(eventType, listener);
    delete events[key];
    return true;
  }
  return false;
};
