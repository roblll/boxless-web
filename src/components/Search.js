import React from "react";

export default class Search extends React.Component {
  render() {
    const { getSearchVids } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.carousel}>
          <div style={styles.left}>
            <i class="material-icons" style={styles.arrow}>
              chevron_left
            </i>
          </div>
          <div style={styles.center}>
            <div style={styles.thumbnail}>
              <img
                src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
                style={styles.image}
                alt="thumbnail"
              />
              <p style={styles.title}>Title - Artist</p>
            </div>
          </div>
          <div style={styles.right}>
            <i class="material-icons" style={styles.arrow}>
              chevron_right
            </i>
          </div>
        </div>
        <div style={styles.search}>
          <input
            type="text"
            name="search"
            placeholder="Search"
            style={styles.input}
          />
          <div style={styles.button} onClick={() => getSearchVids()}>
            <i style={styles.searchIcon} class="material-icons">
              search
            </i>
          </div>
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
  },
  carousel: {
    display: "flex",
  },
  left: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    fontSize: "36px",
    cursor: "pointer",
  },
  center: {
    flex: 3,
    display: "flex",
  },
  thumbnail: {
    display: "flex",
    flexDirection: "column",
    margin: "33px 0",
    cursor: "pointer",
  },
  image: {
    width: "275px",
  },
  title: {
    flex: 1,
    fontSize: "14px",
    height: "28px",
    background: "black",
    padding: "10px",
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "33px",
  },
  input: {
    border: "none",
    background: "black",
    color: "#ddd",
    paddingLeft: "10px",
    height: "45px",
    width: "275px",
  },
  button: {
    border: "none",
    background: "#666",
    color: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  searchIcon: {
    margin: "0 13px",
  },
};
