import React from "react";

const FullControls = (props) => {
  const { info } = props;

  let title = undefined;
  let artist = undefined;
  let vidId = undefined;
  if (info) {
    if (info.title) {
      title = info.title;
    }
    if (info.artist) {
      artist = info.artist;
    }
    if (info.vidId) {
      vidId = info.vidId;
    }
  }

  let text = "";
  if (title && artist) {
    text = `${title} - ${artist}`;
  } else if (title) {
    text = `${title}`;
  }

  return (
    <div style={styles.container}>
      <div>
        {vidId && (
          <img
            src={`https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`}
            alt="test"
            style={styles.image}
          />
        )}
      </div>
      <div style={styles.title}>
        <p style={styles.text}>{text}</p>
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
    backgroundColor: "#252526",
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
