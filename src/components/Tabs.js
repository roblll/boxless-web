import React from "react";
import { Menu } from "semantic-ui-react";

const Tabs = (props) => {
  const { activeTab, handleTabClick } = props;

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <Menu attached="bottom" inverted widths={4}>
          <Menu.Item
            name="options"
            active={activeTab === "options"}
            onClick={handleTabClick}
          >
            <i className="material-icons">music_note</i>
          </Menu.Item>
          <Menu.Item
            name="pick"
            active={activeTab === "pick"}
            onClick={handleTabClick}
          >
            <i className="material-icons">touch_app</i>
          </Menu.Item>
          <Menu.Item
            name="search"
            active={activeTab === "search"}
            onClick={handleTabClick}
          >
            <i className="material-icons">search</i>
          </Menu.Item>
          <Menu.Item
            name="playlist"
            active={activeTab === "playlist"}
            onClick={handleTabClick}
          >
            <i className="material-icons">queue_music</i>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    width: "100vw",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
  },
  innerContainer: {
    width: "100%",
    maxWidth: 450,
  },
};

export default Tabs;
