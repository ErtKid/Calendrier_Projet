import React, { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    const prevMonth = date.getMonth() - 1;
    setDate(new Date(date.getFullYear(), prevMonth, date.getDate()));
  };

  const handleNextMonth = () => {
    const nextMonth = date.getMonth() + 1;
    setDate(new Date(date.getFullYear(), nextMonth, date.getDate()));
  };

  const handlePrevYear = () => {
    const prevYear = date.getFullYear() - 1;
    setDate(new Date(prevYear, date.getMonth(), date.getDate()));
  };

  const handleNextYear = () => {
    const nextYear = date.getFullYear() + 1;
    setDate(new Date(nextYear, date.getMonth(), date.getDate()));
  };

  const handleSetToday = () => setDate(new Date());

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const startWeekday = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  const calendarDays = [];

  for (let i = 0; i < startWeekday; i++) {
    calendarDays.push("");
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <div>
          <button onClick={handlePrevMonth}>{"<"}</button>
          <span>{monthNames[date.getMonth()]}</span>
          <button onClick={handleNextMonth}>{">"}</button>
        </div>
        <button onClick={handlePrevYear}>{"<<"}</button>
        <span>{date.getFullYear()}</span>
        <button onClick={handleNextYear}>{">>"}</button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <table>
          <tr>
            <th>Di</th>
            <th>Lu</th>
            <th>Ma</th>
            <th>Me</th>
            <th>Je</th>
            <th>Ve</th>
            <th>Sa</th>
          </tr>
        </table>

        <div>
          <table>
            <tbody>
              {[...Array(Math.ceil(calendarDays.length / 7))].map(
                (_, rowIndex) => (
                  <tr key={rowIndex}>
                    {calendarDays
                      .slice(rowIndex * 7, (rowIndex + 1) * 7)
                      .map((day, index) => (
                        <td
                          key={index}
                          style={{
                            padding: "3px",
                            backgroundColor:
                              new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                day
                              ).toDateString() === selectedDate.toDateString()
                                ? "black"
                                : "",
                            color:
                              new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                day
                              ).toDateString() === selectedDate.toDateString()
                                ? "white"
                                : "",
                          }}
                          onClick={() =>
                            setSelectedDate(
                              new Date(date.getFullYear(), date.getMonth(), day)
                            )
                          }
                        >
                          {day}
                        </td>
                      ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={handleSetToday}>Aujourd'hui</button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
