import { createContext } from "react";

export interface IPlayerContext {
  clickedPlay: boolean;
  togglePlaying?: () => void;
}

const defaultState = {
  clickedPlay: false,
};

export const PlayerContext = createContext<IPlayerContext>(defaultState);
