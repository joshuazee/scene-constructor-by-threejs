import type { Module } from 'vuex';
import type { RootState } from '..';

export interface MapState {
  map: any;
  layers: Array<any>;
  currentModel: any;
  editIndex: number;
}

const state: MapState = {
  map: {},
  layers: [],
  currentModel: undefined
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
    setMapConfig(state: MapState, payload: any) {
      state.map = payload;
    },
    setCurrentModel(state: MapState, payload: any) {
      state.currentModel = payload;
    }
  }
};
