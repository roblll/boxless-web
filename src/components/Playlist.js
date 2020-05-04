import React from "react";

export default class Playlist extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <p>Playlist</p>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
