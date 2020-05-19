import React from "react";

import MonthDropdown from "./MonthDropdown";
import DayDropdwon from "./DayDropdown";
import YearDropdown from "./YearDropdown";

const Date = () => {
  return (
    <span>
      <div style={styles.date}>
        <MonthDropdown />
        <DayDropdwon days={31} />
        <YearDropdown min={1960} max={2020} />
      </div>
      <div style={styles.dash}>-</div>
      <div style={styles.date}>
        <MonthDropdown />
        <DayDropdwon days={31} />
        <YearDropdown min={1960} max={2020} />
      </div>
    </span>
  );
};

const styles = {
  date: {
    display: "inline",
  },
  dash: {
    display: "inline",
    margin: "0 8px",
  },
};

export default Date;
