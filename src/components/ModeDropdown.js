import React from "react";
import { Dropdown } from "semantic-ui-react";

const modeOptions = [
  {
    key: "audio",
    text: "Audio",
    value: "audio",
  },
  {
    key: "video",
    text: "Video",
    value: "video",
  },
  {
    key: "lyrics",
    text: "Lyrics",
    value: "lyrics",
  },
];

export default class ModeDropdown extends React.Component {
  onChangeValue = (e, { value }) => {
    const { handleChange } = this.props;
    handleChange("mode", value);
  };

  render() {
    const { mode } = this.props;
    const modeIndex = ["audio", "video", "lyrics"].indexOf(mode);
    return (
      <Dropdown
        inline
        scrolling
        options={modeOptions}
        value={modeOptions[modeIndex].value}
        onChange={this.onChangeValue}
      />
    );
  }
}
