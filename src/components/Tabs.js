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
          Options
        </Menu.Item>
        <Menu.Item
          name="pick"
          active={activeTab === "pick"}
          onClick={handleTabClick}
        >
          Pick
        </Menu.Item>
        <Menu.Item
          name="search"
          active={activeTab === "search"}
          onClick={handleTabClick}
        >
          Search
        </Menu.Item>
        <Menu.Item
          name="playlist"
          active={activeTab === "playlist"}
          onClick={handleTabClick}
        >
          Playlist
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Tabs;
