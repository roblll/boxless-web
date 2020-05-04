import React from "react";

export default class Options extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <p>Options</p>
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
