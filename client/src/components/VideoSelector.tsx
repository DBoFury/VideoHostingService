import { useState, useEffect, useContext } from "react";
import styles from "../styles/App.module.css";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import {
  VideoSelectorContext,
  IVideoSelectorContext,
} from "../contexts/VideoSelectorContext";

interface IFile {
  id: string;
  fileName: string;
}

function VideoSelector() {
  const [files, setFiles] = useState<IFile[]>([]);
  const { changeVideoId } =
    useContext<IVideoSelectorContext>(VideoSelectorContext);

  const handleChange = (event: SelectChangeEvent) => {
    changeVideoId?.(event);
  };

  useEffect(() => {
    axios.get<IFile[]>("http://localhost:5000/files").then((response) => {
      setFiles(
        response.data.map((data: any) => ({
          id: data._id,
          fileName: data.filename,
        }))
      );
    });
  }, []);

  return (
    <FormControl>
      <InputLabel id="video-select-label" sx={{ color: "black" }}>
        Video
      </InputLabel>
      <Select
        className={styles.videoSelect}
        labelId="video-select-label"
        id="video-select"
        label="Video"
        onChange={handleChange}
      >
        <MenuItem value={""}>None</MenuItem>
        {files.map((file: IFile, index: number) => (
          <MenuItem key={index} value={file.id}>
            {file.fileName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default VideoSelector;
