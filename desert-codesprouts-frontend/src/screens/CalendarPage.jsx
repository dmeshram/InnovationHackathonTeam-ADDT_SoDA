import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarPage.module.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>📅 Calendar</h1>
        <Calendar
          onChange={setDate}
          value={date}
          className={styles.calendar}
          tileClassName={({ date, view }) =>
            view === "month" && date.getDay() === 0 ? styles.highlight : null
          }
        />
        <p className={styles.selected}>
          Selected Date: <strong>{date.toDateString()}</strong>
        </p>
      </div>
    </div>
  );
};

export default CalendarPage;
