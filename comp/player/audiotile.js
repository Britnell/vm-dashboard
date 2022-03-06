import { useState, useEffect, useRef } from "react";
import styles from "./Player.module.css";

const CL = (array) => array.filter((x) => (x ? true : false)).join(" ");

const AudioTile = ({ file, index, playing, play, stop, next }) => {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const audio = new Audio(file.url);
    audio.addEventListener("canplaythrough", () => setAudio(audio));
  }, []);

  useEffect(() => {
    if (!audio) return;

    if (playing === index) {
      audio.currentTime = 0;
      audio.play();
      audio.addEventListener("ended", () => next());
    } else {
      !audio.paused && audio.pause();
    }
  }, [playing, index, file]);

  const click = () => {
    if (index === playing) stop();
    else play();
  };

  if (!audio)
    return (
      <div key={index} className={styles.tilecontainer}>
        {file.name}
      </div>
    );

  return (
    <div
      key={index}
      className={CL([
        styles.tilecontainer,
        index === playing && styles.playing,
      ])}
      onClick={click}
    >
      <div>{file.name}</div>
      <div>{audio.duration}</div>
    </div>
  );
};

export default AudioTile;
