import { createContext } from "react";

export interface IPlayerContext {
  playing: boolean;
  togglePlaying?: () => void;
}

const defaultState = {
  playing: false,
};

export const PlayerContext = createContext<IPlayerContext>(defaultState);
