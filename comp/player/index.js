import styles from "./Player.module.css";
import AudioTile from "./audiotile";
import { useState, useEffect, useRef } from "react";

const Controls = ({ playing, setPlaying, files }) => {
  useEffect(() => {}, [playing]);

  const stop = () => setPlaying(null);

  return (
    <div>
      <div>
        <h1>Controls</h1>
      </div>
      <div>Playing : {playing}</div>
      {playing !== null && <button onClick={stop}>STOP</button>}
    </div>
  );
};

const Player = ({ files }) => {
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    console.log(files);
  }, []);

  return (
    <div>
      <h1>Player</h1>

      <Controls playing={playing} files={files} setPlaying={setPlaying} />
      <div className={styles.grid}>
        {files.map((f, i) => (
          <AudioTile
            key={i}
            index={i}
            file={f}
            playing={playing}
            play={() => setPlaying(i)}
            stop={() => setPlaying(null)}
            next={() => {
              if (i !== files.length - 1) setPlaying(i + 1);
              else setPlaying(null);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Player;
