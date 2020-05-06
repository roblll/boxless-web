import React from "react";
import { Menu } from "semantic-ui-react";

const Tabs = (props) => {
  const { activeTab, handleTabClick } = props;

  return (
    <div>
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
  );
};

export default Tabs;
