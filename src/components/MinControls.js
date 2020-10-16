import React from "react";

const MinControls = (props) => {
  const { title, artist, vidId, playNext } = props;

  const bgImage = vidId
    ? `url(https://i.ytimg.com/vi/${vidId}/hqdefault.jpg)`
    : "none";

  const styles = {
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#3D3E3F",
      color: "white",
      backgroundImage: bgImage,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      justifyContent: "space-evenly",
      minHeight: "200px",
    },
    title: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "15px",
      padding: "20px",
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.2)",
      height: "72px",
    },
    text: {
      width: "315px",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      background: "rgba(0, 0, 0, 0.2)",
      height: "33px",
    },
    controlsIcons: {
      fontSize: "36px",
      cursor: "pointer",
    },
  };

  let text = "";
  if (title && artist) {
    text = `${title} - ${artist}`;
  } else if (title) {
    text = `${title}`;
  }

  return (
    <div style={styles.container}>
      <div style={styles.thumbnail}>
        <div style={styles.title}>
          <p style={styles.text}>{text}</p>
        </div>
      </div>
      <div style={styles.controls}>
        <i className="material-icons" style={styles.controlsIcons}>
          skip_previous
        </i>
        <i className="material-icons" style={styles.controlsIcons}>
          play_arrow
        </i>
        <i
          className="material-icons"
          style={styles.controlsIcons}
          onClick={playNext}
        >
          skip_next
        </i>
      </div>
    </div>
  );
};

export default MinControls;
