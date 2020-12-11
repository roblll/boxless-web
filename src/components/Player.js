import React from "react";

import ReactPlayer from "react-player/youtube";

class Player extends React.Component {
  state = {
    calledPlayNext: false,
  };

  handlePlayNext = () => {
    const { calledPlayNext } = this.state;
    const { playNext } = this.props;
    if (calledPlayNext) {
      this.setState({ calledPlayNext: false }, () => playNext());
    } else {
      this.setState({ calledPlayNext: true });
    }
  };

  render() {
    let {
      vidId,
      playNext,
      onPlay,
      onPause,
      playing,
      lengthMax,
      onError,
    } = this.props;
    if (playing === null) {
      playing = true;
    }
    return (
      <div style={styles.container}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${vidId}`}
          width="448px"
          height="252px"
          controls={true}
          playing={playing}
          onEnded={this.handlePlayNext}
          onPlay={onPlay}
          onPause={onPause}
          onError={onError}
          config={{
            youtube: {
              playerVars: { start: 0, end: lengthMax },
            },
          }}
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
  },
  center: {
    width: 50,
  },
};

export default Player;

// import React from "react";
// import YouTube from "react-youtube";

// import Static from "./Static";

// const width = 375;
// const height = 200;

// class Player extends React.Component {
//   render() {
//     const { playNext, setPlayer, handleError, onPlay, onPause } = this.props;

//     const opts = {
//       width: "100%",
//       height: "200px",
//       playerVars: {
//         autoplay: 1,
//         playsinline: 1,
//         disablekb: 0,
//         modestbranding: 1,
//         rel: 0,
//       },
//     };

//     return (
//       <YouTube
//         opts={opts}
//         onEnd={() => playNext("automatic")}
//         onReady={setPlayer}
//         onError={handleError}
//         onPlay={onPlay}
//         onPause={onPause}
//       />
//     );
//   }
// }

// export default Player;
