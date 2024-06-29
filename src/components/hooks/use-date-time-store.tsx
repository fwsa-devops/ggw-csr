import { DateTime } from "luxon";
import { create } from "zustand";

interface TimeZoneState {
  dateTime: Date;
  timezone: string;
  // setDateTime: (_value: Date) => void;
  setTimeZone: (_timeZone: string) => void;
}

const getInitialValue = () => {
  const tz = localStorage.getItem("timezone") ?? DateTime.local().zoneName;
  return tz;
};

const useDateTimeStore = create<TimeZoneState>((set) => ({
  timezone: getInitialValue(),
  dateTime: DateTime.local().toJSDate(),
  setTimeZone: (_timeZone) => {
    localStorage.setItem("timezone", _timeZone);
    set({
      timezone: _timeZone,
      dateTime: DateTime.local({ zone: _timeZone }).toJSDate(),
    });
  },
}));

export default useDateTimeStore;
