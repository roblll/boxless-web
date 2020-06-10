import React from "react";

export default class Playlist extends React.Component {
  render() {
    const { playlist, playlistPosition } = this.props;
    const list = playlist.map((vid, index) => {
      let label = "";
      if (vid.title && vid.artist) {
        label = `${vid.title} - ${vid.artist}`;
      } else if (vid.title) {
        label = `${vid.title}`;
      }
      return (
        <div style={styles.row} key={index.toString()}>
          {index === playlistPosition ? (
            <i class="material-icons" style={styles.play}>
              music_note
            </i>
          ) : (
            <i class="material-icons" style={styles.play}></i>
          )}
          <img
            src={`https://i.ytimg.com/vi/${vid.vidId}/hqdefault.jpg`}
            alt="thumbnail"
            style={styles.image}
          />
          <p style={styles.title}>{label}</p>
        </div>
      );
    });

    return (
      <div style={styles.container}>
        <div style={styles.scrollable}>
          {/* <div style={styles.row}>
            <i class="material-icons" style={styles.play}>
              music_note
            </i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.rowSelected}>
            <div style={styles.rowTop}>
              <i class="material-icons" style={styles.play}></i>
              <img
                src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
                alt="thumbnail"
                style={styles.image}
              />
              <p style={styles.title}>Title - Artist</p>
            </div>
            <div style={styles.rowBottom}>
              <i class="material-icons" style={styles.button}>
                play_arrow
              </i>
              <i class="material-icons" style={styles.button}>
                keyboard_arrow_down
              </i>
              <i class="material-icons" style={styles.button}>
                keyboard_arrow_up
              </i>
              <i class="material-icons" style={styles.button}>
                add
              </i>
              <i class="material-icons" style={styles.button}>
                remove
              </i>
            </div>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div>
          <div style={styles.row}>
            <i class="material-icons" style={styles.play}></i>
            <img
              src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
              alt="thumbnail"
              style={styles.image}
            />
            <p style={styles.title}>Title - Artist</p>
          </div> */}
          {list}
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
    backgroundColor: "#3D3E3F",
    color: "white",
  },
  scrollable: {
    height: "330px",
    overflow: "auto",
  },
  row: {
    flex: 1,
    display: "flex",
    borderBottom: "1px black solid",
    alignItems: "center",
    cursor: "pointer",
  },
  play: {
    width: "45px",
    textAlign: "center",
  },
  image: {
    height: "33px",
    margin: "10px 15px 10px 0",
  },
  title: {
    margin: "0px",
    width: "216px",
  },
  rowSelected: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px black solid",
    cursor: "pointer",
    flex: 1,
  },
  rowTop: {
    display: "flex",
    alignItems: "center",
  },
  rowBottom: {
    display: "flex",
    textAlign: "center",
    padding: "0 33px 13px 33px",
  },
  button: {
    flex: 1,
  },
};
