import type { WallLayer } from 'pkg/layer/wall-layer';

export enum LayerType {
  WALL,
  DOOR,
  WINDOW
}

export enum LegendsType {
  IMG = 0,
  STANDARD
}

export interface LegendOption {
  title: string;
  image?: string;
  color?: string;
  clickCallback?: () => void;
}

export interface LegendsOptions {
  show: boolean;
  type: LegendsType;
  position: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  size: [number, number];
  imageUrl?: string;
  data?: Array<LegendOption>;
}

export interface BaseLayerOptions {
  key?: string;
  title?: string;
  type: LayerType;
  hasLegends?: boolean;
  legends?: LegendsOptions;
  url?: string;
  visible?: boolean;
}

export interface WallOptions extends BaseLayerOptions {
  type: LayerType.WALL;
}

export interface DoorOptions extends BaseLayerOptions {
  type: LayerType.DOOR;
}

export interface WindowOptions extends BaseLayerOptions {
  type: LayerType.WINDOW;
}

export type AnyLayer = WallLayer;

export type AnyLayerOptions = WallOptions | DoorOptions | WindowOptions;
