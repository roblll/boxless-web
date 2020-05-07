import React from "react";

export default class Pick extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.pick}>
          <div style={styles.left}>
            <div style={styles.thumbnail}>
              <img
                src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
                alt="left"
                style={styles.image}
              />
              <p style={styles.title}>
                <p>title - artist</p>
              </p>
            </div>
          </div>
          <div style={styles.middle}>
            <div style={styles.circle}>
              <p style={styles.or}>or</p>
            </div>
          </div>
          <div style={styles.right}>
            <div style={styles.thumbnail}>
              <img
                src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
                alt="right"
                style={styles.image}
              />
              <p style={styles.title}>title - artist</p>
            </div>
          </div>
        </div>
        <div style={styles.refresh}>
          <i style={styles.refreshIcon} class="material-icons">
            refresh
          </i>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "#3D3E3F",
    color: "white",
    padding: "20px 0 0 0",
  },
  pick: {
    display: "flex",
    alignItems: "center",
  },
  left: {
    flex: 1,
    cursor: "pointer",
  },
  thumbnail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "175px",
    flex: 1,
  },
  title: {
    fontSize: "14px",
    padding: "10px 10px",
    background: "black",
    width: "175px",
    flex: 1,
    textAlign: "left",
  },
  middle: {
    display: "flex",
    justifyContent: "center",
    margin: "0 -23px",
  },
  circle: {
    background: "#3D3E3F",
    borderRadius: "50%",
    height: "40px",
    width: "40px",
    position: "relative",
  },
  or: {
    position: "relative",
    fontSize: "18px",
    top: "6px",
  },
  right: {
    flex: 1,
    cursor: "pointer",
  },
  refresh: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  refreshIcon: {
    cursor: "pointer",
  },
};
