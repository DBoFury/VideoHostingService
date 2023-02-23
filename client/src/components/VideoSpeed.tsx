import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import SpeedIcon from "@mui/icons-material/Speed";
import { SpeedContext, ISpeedContext } from "../contexts/SpeedContext";

export function VideoSpeed() {
  const { videoSpeed, changeSpeed } = useContext<ISpeedContext>(SpeedContext);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        width: "20vh",
        minWidth: "120px",
      }}
    >
      <Slider
        min={0.5}
        max={2.5}
        step={0.25}
        value={videoSpeed}
        valueLabelDisplay="auto"
        aria-label="Speed"
        onChange={changeSpeed}
      />
      <SpeedIcon />
    </Stack>
  );
}
