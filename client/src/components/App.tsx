import { useState, useRef } from "react";
import styles from "../styles/App.module.css";
import ReactPlayer from "react-player";
import Card from "@mui/material/Card";
import VideoSelector from "./VideoSelector";
import { SelectChangeEvent } from "@mui/material/Select";
import { VideoPlay } from "./VideoPlay";
import { VideoVolume } from "./VideoVolume";
import { PlayerContext } from "../contexts/PlayerContext";
import { VolumeContext } from "../contexts/VolumeContext";
import { VideoSelectorContext } from "../contexts/VideoSelectorContext";

function App() {
  const [videoId, setVideoId] = useState("");
  const [playing, setPlaying] = useState(false);
  const volume = useRef(0.2);

  const changeVideoId = (event: SelectChangeEvent) => {
    console.log(event.target);
    setVideoId(event.target.value as string);
  };

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const changeVolume = (event: Event, value: number | number[]) => {
    volume.current = value as number;
  };

  return (
    <div className={styles.container}>
      <ReactPlayer
        className="react-player"
        url={`http://localhost:5000/${
          videoId === "" ? "initial_file" : "file/" + videoId
        }`}
        playing={playing}
        volume={volume.current}
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
            playing: playing,
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
      </Card>
    </div>
  );
}

export default App;
