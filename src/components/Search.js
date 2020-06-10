import React from "react";

export default class Search extends React.Component {
  state = {
    current: 0,
    search: "",
  };

  handleNext = () => {
    const { current } = this.state;
    const {
      searchResults: { vids },
    } = this.props;
    if (current < vids.length - 1) {
      this.setState({ current: current + 1 });
    }
  };

  handlePrev = () => {
    const { current } = this.state;
    if (current > 0) {
      this.setState({ current: current - 1 });
    }
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ search: value });
  };

  render() {
    const { getSearchVids, searchResults, addToPlaylist } = this.props;
    const { searchTerm, vids } = searchResults;
    const { current, search } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.carousel}>
          <div style={styles.left}>
            <i
              class="material-icons"
              style={styles.arrow}
              onClick={this.handlePrev}
            >
              chevron_left
            </i>
          </div>
          {vids ? (
            <div
              style={styles.center}
              onClick={() =>
                addToPlaylist({
                  vidId: vids[current].vidId,
                  title: vids[current].title,
                })
              }
            >
              <div style={styles.thumbnail}>
                <img
                  src={`https://i.ytimg.com/vi/${vids[current].vidId}/hqdefault.jpg`}
                  style={styles.image}
                  alt="thumbnail"
                />
                <p style={styles.title}>{`${vids[current].title}`}</p>
              </div>
            </div>
          ) : (
            <p>Nothing</p>
          )}
          <div style={styles.right}>
            <i
              class="material-icons"
              style={styles.arrow}
              onClick={this.handleNext}
            >
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
            value={search}
            onChange={this.handleChange}
          />
          <div style={styles.button} onClick={() => getSearchVids(search)}>
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
