import React from 'react';
import {makeAutoObservable, runInAction} from 'mobx';

export class Store {
    isDeviceOrientationLocked = false;

    constructor() {
        makeAutoObservable(this);
    }

    async setDeviceOrientationLocked(value) {
        runInAction(() => {
            this.isDeviceOrientationLocked = value;
        });
    }
}

export const store = new Store();

if (__DEV__) {
    window.store = store;
}

export const StoreContext = React.createContext(store);
export const useStore = () => React.useContext(StoreContext);
