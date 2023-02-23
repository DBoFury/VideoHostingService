import { createContext } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

export interface IVideoSelectorContext {
  changeVideoId?: (event: SelectChangeEvent) => void;
}

const defaultState = {
  changeVideoId: () => {},
};

export const VideoSelectorContext =
  createContext<IVideoSelectorContext>(defaultState);
