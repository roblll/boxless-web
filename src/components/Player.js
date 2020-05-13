import React from "react";
import YouTube from "react-youtube";

class Player extends React.Component {
  render() {
    const { getVid, vidId } = this.props;

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
        <YouTube videoId={vidId} opts={opts} onReady={getVid} />
      </div>
    );
  }
}

export default Player;
