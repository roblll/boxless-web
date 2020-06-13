import React from "react";
import YouTube from "react-youtube";

import Static from "./Static";

const width = 375;
const height = 200;

class Player extends React.Component {
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
      },
    };

    return (
      <div style={styles.video}>
        {vidId ? (
          <YouTube videoId={vidId} opts={opts} onEnd={playNext} />
        ) : (
          <Static height={height} width={width} />
        )}
      </div>
    );
  }
}

export default Player;
