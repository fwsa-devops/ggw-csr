"use client";

import { DateTime } from "luxon";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the interface for the store state and actions
type DateTimeStoreState = {
  timezone: string;
  dateTime: Date;
  setTimeZone: (timeZone: string) => void;
};

// Use the defined interface in the store creation
const useDateTimeStore = create<DateTimeStoreState>()(
  persist(
    (set) => ({
      timezone: DateTime.local().zoneName,
      dateTime: DateTime.local().toJSDate(),
      setTimeZone: (timeZone: string) => {
        localStorage.setItem("timezone", timeZone);
        set({
          timezone: timeZone,
          dateTime: DateTime.local({ zone: timeZone }).toJSDate(),
        });
      },
    }),
    {
      name: "timezone",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useDateTimeStore;
