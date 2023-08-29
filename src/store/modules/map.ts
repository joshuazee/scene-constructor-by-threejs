import type { AnyLayer } from 'pkg/types/three-map-layers';
import type { Module } from 'vuex';
import type { RootState } from '..';

export interface MapState {
  layers: Array<any>;
  currentModel: AnyLayer | undefined;
  editIndex: number;
}

const state: MapState = {
  layers: [],
  currentModel: undefined,
  editIndex: 0
};

export const mapModel: Module<MapState, RootState> = {
  namespaced: true,
  state,
  getters: {},
  mutations: {
    setLayerConfig(state: MapState, payload: Array<any>) {
      state.layers = payload;
      console.log(payload);
    },
    setCurrentModel(state: MapState, payload: any) {
      state.currentModel = payload;
    },
    setEditIndex(state: MapState, payload: any) {
      state.editIndex++;
    }
  }
};
