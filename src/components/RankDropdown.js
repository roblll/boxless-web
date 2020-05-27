import React from "react";
import { Dropdown } from "semantic-ui-react";

export default class RankDropdown extends React.Component {
  onChangeValue = (e, { value }) => {
    const { handleChange, rankType } = this.props;
    handleChange(rankType, value);
  };

  render() {
    const { min, max, value } = this.props;
    const rankOptions = [];

    for (let i = min; i <= max; i += 1) {
      rankOptions.push({
        key: i,
        text: i.toString(),
        value: i,
      });
    }

    return (
      <Dropdown
        inline
        scrolling
        options={rankOptions}
        value={value}
        onChange={this.onChangeValue}
      />
    );
  }
}
