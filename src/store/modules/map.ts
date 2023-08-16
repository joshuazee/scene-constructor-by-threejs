import type { Module } from 'vuex';
import type { RootState } from '..';

export interface MapState {
  layers: Array<any>;
}

const state: MapState = {
  layers: []
};

export const mapModel: Module<MapState, RootState> = {
  namespaced: true,
  state,
  getters: {},
  mutations: {
    setLayerConfig(state: MapState, payload: Array<any>) {
      state.layers = payload;
      console.log(payload);
    }
  }
};
