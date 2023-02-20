import { createContext } from "react";

export interface ISpeedContext {
  changeSpeed?: (event: Event, value: number | number[]) => void;
}

const defaultState = {
  changeSpeed: () => {},
};

export const SpeedContext = createContext<ISpeedContext>(defaultState);
