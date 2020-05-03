import React from "react";
import { Menu } from "semantic-ui-react";

const Tabs = (props) => {
  return (
    <div>
      <Menu attached="bottom" inverted widths={4}>
        <Menu.Item active={true}>Options</Menu.Item>
        <Menu.Item>Pick</Menu.Item>
        <Menu.Item>Search</Menu.Item>
        <Menu.Item>Playlist</Menu.Item>
      </Menu>
    </div>
  );
};

export default Tabs;
