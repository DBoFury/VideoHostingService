import { useContext } from "react";
import Stack from "@mui/material/Stack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import { PlayerContext, IPlayerContext } from "../contexts/PlayerContext";

export interface IVideoPlayComponentProps {
  skipPreviousDisabled?: boolean;
  skipNextDisabled?: boolean;
}

export function VideoPlay({
  skipPreviousDisabled = false,
  skipNextDisabled = false,
}: IVideoPlayComponentProps) {
  const { clickedPlay, togglePlaying } =
    useContext<IPlayerContext>(PlayerContext);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{
        width: "20vh",
      }}
    >
      <IconButton disabled={skipPreviousDisabled}>
        <SkipPreviousIcon />
      </IconButton>
      <IconButton onClick={() => togglePlaying?.()}>
        {clickedPlay ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton disabled={skipNextDisabled}>
        <SkipNextIcon />
      </IconButton>
    </Stack>
  );
}
