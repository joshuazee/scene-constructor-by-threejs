import type { Module } from 'vuex';
import type { RootState } from '..';

export interface MapState {}

const state: MapState = {};

export const mapModel: Module<MapState, RootState> = {
  namespaced: true,
  state,
  getters: {},
  mutations: {}
};
