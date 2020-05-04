import React from "react";

export default class Search extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <p>Search</p>
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
