import React from "react";

import MonthDropdown from "./MonthDropdown";
import DayDropdwon from "./DayDropdown";
import YearDropdown from "./YearDropdown";

const DateRange = (props) => {
  const { dateMin, dateMax } = props;

  // if (dateMin == null && dateMax == null)

  // const min = Date(dateMin);
  // const yMin = min.getFullYear();
  // console.log(yMin);
  return (
    <span>
      <div style={styles.date}>
        <MonthDropdown month={4} />
        <DayDropdwon day={20} days={31} />
        <YearDropdown year={2010} min={1960} max={2020} />
      </div>
      <div style={styles.dash}>-</div>
      <div style={styles.date}>
        <MonthDropdown month={4} />
        <DayDropdwon day={20} days={31} />
        <YearDropdown year={2020} min={1960} max={2020} />
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
