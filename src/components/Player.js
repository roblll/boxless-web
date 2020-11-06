import React from "react";
import YouTube from "react-youtube";

import Static from "./Static";
import { getRandNum } from "../utils/utils";

const width = 375;
const height = 200;

class Player extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.vidId === this.props.vidId &&
      nextProps.vidLength === this.props.vidLength
    ) {
      return false;
    }
    return true;
  }

  play = (e, seconds) => {
    const { getTimers, onPlay } = this.props;
    onPlay();
    const timers = [];
    e.target.setVolume(10);
    const t1 = setTimeout(() => e.target.setVolume(20), 500);
    const t2 = setTimeout(() => e.target.setVolume(30), 1000);
    const t3 = setTimeout(() => e.target.setVolume(40), 1500);
    const t4 = setTimeout(() => e.target.setVolume(50), 2000);
    const t5 = setTimeout(() => e.target.setVolume(60), 2500);
    const t6 = setTimeout(() => e.target.setVolume(70), 3000);
    const t7 = setTimeout(() => e.target.setVolume(80), 3500);
    const t8 = setTimeout(() => e.target.setVolume(90), 4000);
    const t9 = setTimeout(() => e.target.setVolume(100), 4500);
    const t10 = setTimeout(() => e.target.setVolume(90), seconds * 1000 - 4500);
    const t11 = setTimeout(() => e.target.setVolume(80), seconds * 1000 - 4000);
    const t12 = setTimeout(() => e.target.setVolume(70), seconds * 1000 - 3500);
    const t13 = setTimeout(() => e.target.setVolume(60), seconds * 1000 - 3000);
    const t14 = setTimeout(() => e.target.setVolume(50), seconds * 1000 - 2500);
    const t15 = setTimeout(() => e.target.setVolume(40), seconds * 1000 - 2000);
    const t16 = setTimeout(() => e.target.setVolume(30), seconds * 1000 - 1500);
    const t17 = setTimeout(() => e.target.setVolume(20), seconds * 1000 - 1000);
    const t18 = setTimeout(() => e.target.setVolume(10), seconds * 1000 - 500);
    const t19 = setTimeout(() => e.target.setVolume(0), seconds * 1000);
    timers.push(t1);
    timers.push(t2);
    timers.push(t3);
    timers.push(t4);
    timers.push(t5);
    timers.push(t6);
    timers.push(t7);
    timers.push(t8);
    timers.push(t9);
    timers.push(t10);
    timers.push(t11);
    timers.push(t12);
    timers.push(t13);
    timers.push(t14);
    timers.push(t15);
    timers.push(t16);
    timers.push(t17);
    timers.push(t18);
    timers.push(t19);
    getTimers(timers);
  };

  pause = () => {
    const { onPause } = this.props;
    onPause();
  };

  render() {
    const { vidId, vidLength, playNext, songLength, setPlayer } = this.props;

    const styles = {
      video: {
        width: "100vw",
        height: height,
        backgroundColor: "darkgray",
      },
    };

    let start = 60;
    let end = 60 + songLength;
    if (vidLength && vidLength > songLength) {
      const minStart = Math.round(vidLength * 0.1);
      const maxStart = Math.round(vidLength * 0.9) - 100;
      start = getRandNum(minStart, maxStart);
      end = start + songLength;
    }

    const opts = {
      width: "100%",
      height: "200px",
      playerVars: {
        autoplay: 1,
        start: start,
        end: end,
        playsinline: 1,
        disablekb: 0,
        modestbranding: 1,
        rel: 0,
      },
    };

    return (
      <div style={styles.video}>
        {vidId ? (
          <YouTube
            videoId={vidId}
            opts={opts}
            onEnd={playNext}
            onPlay={(e) => this.play(e, songLength)}
            onPause={(e) => this.pause()}
            onError={(e) => playNext()}
            onReady={setPlayer}
          />
        ) : (
          <Static height={height} width={"100vw"} />
        )}
      </div>
    );
  }
}

export default Player;
