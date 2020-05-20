import React from "react";

import MonthDropdown from "./MonthDropdown";
import DayDropdwon from "./DayDropdown";
import YearDropdown from "./YearDropdown";

const DateRange = (props) => {
  const { dayMin, dayMax, monthMin, monthMax, yearMin, yearMax } = props;

  return (
    <span>
      <div style={styles.date}>
        <MonthDropdown month={monthMin} />
        <DayDropdwon day={dayMin} days={31} />
        <YearDropdown year={yearMin} min={1960} max={2020} />
      </div>
      <div style={styles.dash}>-</div>
      <div style={styles.date}>
        <MonthDropdown month={monthMax} />
        <DayDropdwon day={dayMax} days={31} />
        <YearDropdown year={yearMax} min={1960} max={2020} />
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

export default DateRange;
