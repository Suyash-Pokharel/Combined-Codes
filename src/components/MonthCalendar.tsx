import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MonthCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) =>
    new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) =>
    new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const startDayIndex = getFirstDayOfMonth(year, month);

  const prevMonthDays = getDaysInMonth(year, month - 1);
  const prevMonthPadding = Array.from(
    { length: startDayIndex },
    (_, i) => prevMonthDays - startDayIndex + i + 1,
  );
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const totalCells = 42;
  const nextMonthPadding = Array.from(
    { length: totalCells - (startDayIndex + daysInMonth) },
    (_, i) => i + 1,
  );

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);

  const isToday = (d: number) => {
    return (
      d === todayObj.getDate() &&
      month === todayObj.getMonth() &&
      year === todayObj.getFullYear()
    );
  };

  const isPast = (d: number, checkMonth: number, checkYear: number) => {
    const checkDate = new Date(checkYear, checkMonth, d);
    return checkDate < todayObj;
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-text-main select-none p-4 md:p-6 bg-surface border border-border shadow-md rounded-2xl">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-text-main uppercase tracking-tight">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-1.5 text-text-secondary hover:text-text-main hover:bg-surface-highlight rounded-lg transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-xs font-medium bg-surface border border-border text-text-main rounded-md shadow-sm hover:bg-surface-highlight hover:border-text-secondary transition-colors cursor-pointer"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 text-text-secondary hover:text-text-main hover:bg-surface-highlight rounded-lg transition-colors cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* --- CALENDAR GRID --- */}
      <div className="flex flex-col gap-2">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] md:text-xs font-bold text-text-secondary tracking-wider uppercase"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-fr gap-2">
          {/* 1. Previous Month Padding */}
          {prevMonthPadding.map((day) => (
            <div
              key={`prev-${day}`}
              className="h-20 sm:h-24 lg:h-28 border border-transparent rounded-xl p-2 opacity-30 flex flex-col items-start pointer-events-none"
            >
              <span className="text-xs md:text-sm font-medium text-text-secondary">
                {day}
              </span>
            </div>
          ))}

          {/* 2. Current Month Days */}
          {currentMonthDays.map((day) => {
            const today = isToday(day);
            const past = isPast(day, month, year);

            return (
              <div
                key={`curr-${day}`}
                className={`group relative h-20 sm:h-24 lg:h-28 rounded-xl p-2 md:p-3 flex flex-col gap-1.5 transition-all duration-200 overflow-hidden
                  border
                  ${
                    today
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-surface"
                  }
                  ${
                    past
                      ? "bg-background opacity-60 cursor-default border-transparent"
                      : "hover:bg-surface-highlight hover:border-primary/30 hover:shadow-sm"
                  }
                `}
              >
                {/* Header: Date Number */}
                <div className="flex justify-between items-start h-6">
                  {/* Date Number */}
                  <span
                    className={`text-sm sm:text-base md:text-lg font-semibold leading-none
                    ${
                      today
                        ? "text-primary"
                        : "text-text-main"
                    }
                    ${past ? "text-text-secondary font-normal" : ""}
                  `}
                  >
                    {day}
                  </span>

                  {/* Plus Button */}
                  {!past && (
                    <button
                      className="
                        opacity-0 group-hover:opacity-100 transition-all duration-200
                        flex items-center justify-center
                        rounded md:rounded-md
                        bg-surface-highlight border border-border
                        text-text-secondary
                        hover:text-primary hover:border-primary
                        w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
                      "
                      title="Schedule Post"
                    >
                      <Plus
                        className="w-2.5 h-2.5 md:w-3.5 md:h-3.5"
                        strokeWidth={3}
                      />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* 3. Next Month Padding */}
          {nextMonthPadding.map((day) => (
            <div
              key={`next-${day}`}
              className="h-20 sm:h-24 lg:h-28 border border-transparent rounded-xl p-2 opacity-30 flex flex-col items-start pointer-events-none"
            >
              <span className="text-xs md:text-sm font-medium text-text-secondary">
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthCalendar;
