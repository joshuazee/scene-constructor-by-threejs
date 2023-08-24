import type { FloorLayer } from 'pkg/layer/floor-layer';
import type { WallLayer } from 'pkg/layer/wall-layer';

export enum LayerType {
  WALL,
  FLOOR
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
  title: string;
  type: LayerType;
  hasLegends?: boolean;
  legends?: LegendsOptions;
  url?: string;
  visible?: boolean;
  children?: Array<AnyLayerOptions>;
}

export interface FloorOptions extends BaseLayerOptions {
  type: LayerType.FLOOR;
  coordinates: Array<[number, number]>;
  height: number;
  bottomHeight: number;
  center: [number, number];
  color: string;
}

export interface WallOptions extends BaseLayerOptions {
  type: LayerType.WALL;
  width: number;
  height: number;
  depth: number;
  center: [number, number];
  rotate: number;
  color: string;
  opacity: number;
  doors?: DoorWindowOptions[];
  windows?: DoorWindowOptions[];
}

export interface DoorWindowOptions {
  width: number;
  height: number;
  depth: number;
  center: [number, number];
  texture: string;
  border: {
    width: number;
    height: number;
    color: string;
  };
}

export type AnyLayer = WallLayer | FloorLayer;

export type AnyLayerOptions = WallOptions | FloorOptions;
