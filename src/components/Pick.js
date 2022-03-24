import React from "react";

export default class Pick extends React.Component {
  componentDidMount() {
    console.log("refresh");
    const { refresh } = this.props;
    refresh();
  }

  render() {
    const { refresh, addToPlaylist, pickVid1, pickVid2, fetchingPicks } =
      this.props;

    if (!fetchingPicks) {
      return (
        <div style={styles.container}>
          <div style={styles.header}>
            <p>Pick one to add to queue</p>
          </div>
          <div style={styles.pick}>
            {pickVid1 && pickVid2 ? (
              <div
                style={styles.left}
                onClick={() => {
                  addToPlaylist(pickVid1);
                  refresh();
                }}
              >
                <div style={styles.thumbnail}>
                  <img
                    src={`https://i.ytimg.com/vi/${pickVid1.vidId}/hqdefault.jpg`}
                    alt="left"
                    style={styles.image}
                  />
                  <p style={styles.title}>
                    <p>
                      {pickVid1.title} - {pickVid1.artist}
                    </p>
                  </p>
                </div>
              </div>
            ) : (
              <div style={styles.left}>
                <div style={styles.thumbnail}>
                  <div style={styles.blank}></div>
                </div>
              </div>
            )}

            <div style={styles.middle}>
              <div style={styles.circle}>
                <p style={styles.or}>or</p>
              </div>
            </div>

            {pickVid1 && pickVid2 ? (
              <div
                style={styles.right}
                onClick={() => {
                  addToPlaylist(pickVid2);
                  refresh();
                }}
              >
                <div style={styles.thumbnail}>
                  <img
                    src={`https://i.ytimg.com/vi/${pickVid2.vidId}/hqdefault.jpg`}
                    alt="right"
                    style={styles.image}
                  />
                  <p style={styles.title}>
                    {pickVid2.title} - {pickVid2.artist}
                  </p>
                </div>
              </div>
            ) : (
              <div style={styles.right}>
                <div style={styles.thumbnail}>
                  <div style={styles.blank}></div>
                </div>
              </div>
            )}
          </div>
          <div style={styles.refresh}>
            <i
              style={styles.refreshIcon}
              class="material-icons"
              onClick={() => refresh()}
            >
              refresh
            </i>
          </div>
        </div>
      );
    } else {
      return (
        <div style={styles.container}>
          <div style={styles.imageContainer}>
            <img
              src={"../../loading.gif"}
              alt="left"
              style={styles.loadingImage}
            />
          </div>
        </div>
      );
    }
  }
}

const styles = {
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "#252526",
    color: "white",
    minWidth: "375px",
  },
  pick: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "black",
  },
  left: {
    flex: 1,
    cursor: "pointer",
    height: "100%",
  },
  thumbnail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: "14px",
    padding: "10px 10px",
    backgroundColor: "black",
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
    height: "100%",
  },
  refresh: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  refreshIcon: {
    cursor: "pointer",
  },
  blank: {
    backgroundColor: "black",
    height: "175px",
    width: "175px",
  },
  loadingImage: {
    height: "50px",
    width: "50px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    minHeight: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
