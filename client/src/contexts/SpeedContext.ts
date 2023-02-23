import { createContext } from "react";

export interface ISpeedContext {
  videoSpeed?: number;
  changeSpeed?: (event: Event, value: number | number[]) => void;
}

const defaultState = {
  videoSpeed: 1,
  changeSpeed: () => {},
};

export const SpeedContext = createContext<ISpeedContext>(defaultState);
