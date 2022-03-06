import { useState, useEffect, useRef } from "react";

const getItem = (list, x) => {
  if (x < list.length) return list[x];
};
const PLayer = () => {
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  const audio = useRef();
  const next = useRef();

  console.log(files);

  useEffect(() => {
    if (!playing && index === 0) audio.current = new Audio(files[index]);

    console.log("=> ", index, playing);

    const loadNext = () => {
      console.log("ended ", index);

      let next = index + 1;
      if (next < files.length) {
        console.log("loading ", next);
        audio.current = new Audio(files[next]);
        if (playing)
          audio.current.addEventListener("canplaythrough", () => {
            console.log(" Next ready play");
            audio.current.play();
          });
        setIndex(next);
      }
    };

    audio.current.addEventListener("ended", loadNext);
    return () => audio.current.removeEventListener("ended", loadNext);
  }, [index, playing]);

  const click = () => {
    if (!playing) {
      audio.current.play();
      setPlaying(true);
    } else {
      audio.current.pause();
      setPlaying(false);
    }
  };

  return <div>x</div>;
};
