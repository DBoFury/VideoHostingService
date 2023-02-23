import { useState, useRef } from "react";
import styles from "../styles/App.module.css";
import ReactPlayer from "react-player";
import Card from "@mui/material/Card";
import VideoSelector from "./VideoSelector";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { VideoSpeed } from "./VideoSpeed";
import { SpeedContext } from "../contexts/SpeedContext";
import { SelectChangeEvent } from "@mui/material/Select";
import { VideoPlay } from "./VideoPlay";
import { VideoVolume } from "./VideoVolume";
import { PlayerContext } from "../contexts/PlayerContext";
import { VolumeContext } from "../contexts/VolumeContext";
import { VideoSelectorContext } from "../contexts/VideoSelectorContext";

function App() {
  const [videoId, setVideoId] = useState<string>("");
  const [clickedPlay, setClickedPlay] = useState<boolean>(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const { width, height } = useWindowDimensions();
  const volume = useRef(0.2);

  const changeVideoId = (event: SelectChangeEvent) => {
    setVideoId(event.target.value as string);
  };

  const togglePlaying = () => {
    setClickedPlay(!clickedPlay);
  };

  const changeVolume = (event: Event, value: number | number[]) => {
    volume.current = value as number;
  };

  const changeSpeed = (event: Event, value: number | number[]) => {
    setVideoSpeed(value as number);
  };

  return (
    <div className={styles.container}>
      <ReactPlayer
        url={`http://localhost:5000/${
          videoId === "" ? "initial_file" : "file/" + videoId
        }`}
        playing={clickedPlay}
        volume={volume.current}
        playbackRate={videoSpeed}
        width={width > 860 ? width / 2 : width - 20}
        height={height / 2}
      />
      <Card className={styles.card} sx={{ backgroundColor: "#A8D0E7" }}>
        <VideoSelectorContext.Provider
          value={{
            changeVideoId: changeVideoId,
          }}
        >
          <VideoSelector />
        </VideoSelectorContext.Provider>

        <PlayerContext.Provider
          value={{
            clickedPlay: clickedPlay,
            togglePlaying: togglePlaying,
          }}
        >
          <VideoPlay />
        </PlayerContext.Provider>
        <VolumeContext.Provider
          value={{
            changeVolume: changeVolume,
          }}
        >
          <VideoVolume />
        </VolumeContext.Provider>
        <SpeedContext.Provider
          value={{
            videoSpeed: videoSpeed,
            changeSpeed: changeSpeed,
          }}
        >
          <VideoSpeed />
        </SpeedContext.Provider>
      </Card>
    </div>
  );
}

export default App;
