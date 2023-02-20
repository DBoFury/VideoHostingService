import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { VolumeContext, IVolumeContext } from "../contexts/VolumeContext";

export function VideoVolume() {
  const { changeVolume } = useContext<IVolumeContext>(VolumeContext);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        width: "20vh",
      }}
    >
      <VolumeDown />
      <Slider
        min={0}
        max={1}
        step={0.01}
        aria-label="Volume"
        onChange={changeVolume}
      />
      <VolumeUp />
    </Stack>
  );
}
