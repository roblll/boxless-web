import React from "react";

import ReactPlayer from "react-player/youtube";

class Player extends React.Component {
  render() {
    let {
      vidId,
      playNext,
      onPlay,
      onPause,
      playing,
      lengthMax,
      onError,
      muted,
      endSong,
    } = this.props;
    if (playing === null) {
      playing = true;
    }
    return (
      <div style={styles.container}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${vidId}`}
          width="100%"
          height="250px"
          controls={true}
          playing={playing}
          onEnded={endSong}
          onPlay={onPlay}
          onPause={onPause}
          onError={() => {
            console.log("error");
            endSong();
          }}
          config={{
            youtube: {
              playerVars: { start: 0, end: lengthMax },
            },
          }}
          muted={muted}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    maxWidth: 450,
  },
  center: {
    width: 50,
  },
};

export default Player;
