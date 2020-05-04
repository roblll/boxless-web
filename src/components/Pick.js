import React from "react";

export default class Pick extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <p>Pick</p>
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
