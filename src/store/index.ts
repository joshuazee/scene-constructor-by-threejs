import type { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { mapModel, type MapState } from './modules/map';

export interface RootState {
  map: MapState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const modules = {
  map: mapModel
};

const store = createStore<RootState>({ modules });

export const useStore = (): Store<RootState> => baseUseStore(key);

export default store;
