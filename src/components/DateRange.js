import React from "react";

import MonthDropdown from "./MonthDropdown";
import DayDropdwon from "./DayDropdown";
import YearDropdown from "./YearDropdown";

const today = new Date();
const totalYearMax = today.getFullYear();

const DateRange = (props) => {
  const { dayMin, dayMax, monthMin, monthMax, yearMin, yearMax, handleChange } =
    props;

  return (
    <span>
      <div style={styles.date}>
        <MonthDropdown
          month={monthMin}
          handleChange={handleChange}
          monthType="monthMin"
        />
        <DayDropdwon
          day={dayMin}
          days={31}
          handleChange={handleChange}
          dayType="dayMin"
        />
        <YearDropdown
          year={yearMin}
          min={1960}
          max={totalYearMax}
          handleChange={handleChange}
          yearType="yearMin"
        />
      </div>
      <div style={styles.dash}>-</div>
      <div style={styles.date}>
        <MonthDropdown
          month={monthMax}
          handleChange={handleChange}
          monthType="monthMax"
        />
        <DayDropdwon
          day={dayMax}
          days={31}
          handleChange={handleChange}
          dayType="dayMax"
        />
        <YearDropdown
          year={yearMax}
          min={1960}
          max={totalYearMax}
          handleChange={handleChange}
          yearType="yearMax"
        />
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
