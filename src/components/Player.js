import React from "react";
import YouTube from "react-youtube";

import Static from "./Static";

const width = 375;
const height = 200;

class Player extends React.Component {
  test = (e) => {
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
    const { getVid, vidId, playNext } = this.props;

    const styles = {
      video: {
        width: width,
        height: height,
        backgroundColor: "darkgray",
      },
    };

    const opts = {
      width: "100%",
      height: "200px",
      playerVars: {
        autoplay: 1,
        start: 60,
        end: 120,
      },
    };

    return (
      <div style={styles.video}>
        {vidId ? (
          <YouTube
            videoId={vidId}
            opts={opts}
            onEnd={playNext}
            onPlay={this.test}
          />
        ) : (
          <Static height={height} width={width} />
        )}
      </div>
    );
  }
}

export default Player;
