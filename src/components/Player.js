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

  fade = (e) => {
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
    setTimeout(() => e.target.setVolume(90), 55500);
    setTimeout(() => e.target.setVolume(80), 56000);
    setTimeout(() => e.target.setVolume(70), 56500);
    setTimeout(() => e.target.setVolume(60), 57000);
    setTimeout(() => e.target.setVolume(50), 57500);
    setTimeout(() => e.target.setVolume(40), 58000);
    setTimeout(() => e.target.setVolume(30), 58500);
    setTimeout(() => e.target.setVolume(20), 59000);
    setTimeout(() => e.target.setVolume(10), 59500);
    setTimeout(() => e.target.setVolume(0), 60000);
  };

  render() {
    const { vidId, vidLength, playNext } = this.props;

    const styles = {
      video: {
        width: "100vw",
        height: height,
        backgroundColor: "darkgray",
      },
    };

    let start = 60;
    let end = 120;
    if (vidLength && vidLength > 60) {
      const minStart = Math.round(vidLength * 0.1);
      const maxStart = Math.round(vidLength * 0.9) - 60;
      start = getRandNum(minStart, maxStart);
      end = start + 60;
    }

    const opts = {
      width: "100%",
      height: "200px",
      playerVars: {
        autoplay: 1,
        start: start,
        end: end,
      },
    };

    return (
      <div style={styles.video}>
        {vidId ? (
          <YouTube
            videoId={vidId}
            opts={opts}
            onEnd={playNext}
            onPlay={this.fade}
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
