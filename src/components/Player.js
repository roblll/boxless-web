import React from "react";
import YouTube from "react-youtube";

import Static from "./Static";

const width = 375;
const height = 200;

class Player extends React.Component {
  render() {
    const { playNext, setPlayer, handleError, onPlay, onPause } = this.props;

    const opts = {
      width: "100%",
      height: "200px",
      playerVars: {
        autoplay: 1,
        playsinline: 1,
        disablekb: 0,
        modestbranding: 1,
        rel: 0,
      },
    };

    return (
      <YouTube
        opts={opts}
        onEnd={() => playNext("automatic")}
        onReady={setPlayer}
        onError={handleError}
        onPlay={onPlay}
        onPause={onPause}
      />
    );
  }
}

export default Player;
