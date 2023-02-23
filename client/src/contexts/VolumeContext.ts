import { createContext } from "react";

export interface IVolumeContext {
  changeVolume?: (event: Event, value: number | number[]) => void;
}

const defaultState = {
  changeVolume: () => {},
};

export const VolumeContext = createContext<IVolumeContext>(defaultState);
