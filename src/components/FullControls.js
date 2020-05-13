import React from "react";

const FullControls = (props) => {
  const { title, artist } = props;

  return (
    <div style={styles.container}>
      <div>
        <img
          src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
          alt="test"
          style={styles.image}
        />
      </div>
      <div style={styles.title}>
        <p style={styles.text}>
          {title} - {artist}
        </p>
      </div>
      <div style={styles.controls}>
        <i className="material-icons" style={styles.controlsIcon}>
          skip_previous
        </i>
        <i className="material-icons" style={styles.controlsIcon}>
          play_arrow
        </i>
        <i className="material-icons" style={styles.controlsIcon}>
          skip_next
        </i>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#3D3E3F",
    color: "white",
  },
  image: {
    width: "375px",
    flex: 1,
  },
  title: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    padding: "28px",
    textAlign: "center",
  },
  text: {
    width: "315px",
  },
  controls: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    background: "#3D3E3F",
  },
  controlsIcon: {
    fontSize: "36px",
    cursor: "pointer",
  },
};

export default FullControls;
