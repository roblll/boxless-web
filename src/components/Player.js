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

  fade = (e, seconds) => {
    e.target.setVolume(10);
    setTimeout(() => e.target.setVolume(20), 500);
    setTimeout(() => e.target.setVolume(30), 1000);
    setTimeout(() => e.target.setVolume(40), 1500);
    setTimeout(() => e.target.setVolume(50), 2000);
    setTimeout(() => e.target.setVolume(60), 2500);
    setTimeout(() => e.target.setVolume(70), 3000);
    setTimeout(() => e.target.setVolume(80), 3500);
    setTimeout(() => e.target.setVolume(90), 4000);
    setTimeout(() => e.target.setVolume(100), 4500);
    setTimeout(() => e.target.setVolume(90), seconds * 1000 - 4500);
    setTimeout(() => e.target.setVolume(80), seconds * 1000 - 4000);
    setTimeout(() => e.target.setVolume(70), seconds * 1000 - 3500);
    setTimeout(() => e.target.setVolume(60), seconds * 1000 - 3000);
    setTimeout(() => e.target.setVolume(50), seconds * 1000 - 2500);
    setTimeout(() => e.target.setVolume(40), seconds * 1000 - 2000);
    setTimeout(() => e.target.setVolume(30), seconds * 1000 - 1500);
    setTimeout(() => e.target.setVolume(20), seconds * 1000 - 1000);
    setTimeout(() => e.target.setVolume(10), seconds * 1000 - 500);
    setTimeout(() => e.target.setVolume(0), seconds * 1000);
  };

  render() {
    const { vidId, vidLength, playNext, songLength } = this.props;

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
      },
    };

    return (
      <div style={styles.video}>
        {vidId ? (
          <YouTube
            videoId={vidId}
            opts={opts}
            onEnd={playNext}
            onPlay={(e) => this.fade(e, songLength)}
            onError={(e) => console.log(e)}
          />
        ) : (
          <Static height={height} width={"100vw"} />
        )}
      </div>
    );
  }
}

export default Player;
