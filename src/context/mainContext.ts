import { createContext } from "react";

const MainContext = createContext<any>({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index: number) => {},
  daySelected: null,
  setDaySelected: (day: string) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }: { type: string; payload: any }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
});

export default MainContext;
