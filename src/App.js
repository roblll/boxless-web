import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import Login from "./components/Login";
import Player from "./components/Player";

export default class App extends Component {
  state = {
    loggedIn: false,
    playing: false,
    vidId: "QYh6mYIJG2Y",
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  render() {
    const { loggedIn, playing, vidId } = this.state;

    if (loggedIn) {
      return (
        <div style={styles.container}>
          <Player vidId={vidId} playing={playing} />
          <Button onClick={this.handlePlayPause}>Play</Button>
        </div>
      );
    } else {
      return <Login handleLogin={this.handleLogin} />;
    }
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "black",
  },
  bottomPadding: {
    height: "50px",
    backgroundColor: "#3D3E3F",
  },
};
