import React from "react";
import YouTube from "react-youtube";

class Player extends React.Component {
  render() {
    const styles = {
      video: {
        width: "375px",
        height: "200px",
        backgroundColor: "darkgray",
      },
    };

    const opts = {
      width: "100%",
      height: "200px",
    };

    return (
      <div style={styles.video}>
        <YouTube videoId="jNQXAC9IVRw" opts={opts} />
      </div>
    );
  }
}

export default Player;
