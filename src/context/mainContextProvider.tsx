import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  PropsWithChildren,
} from "react";
import MainContext from "./mainContext";
import dayjs from "dayjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

function savedEventsReducer(state: any, { type, payload }: any) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "pushArray":
      const temp = state.map((item: any) => item.id);
      const temp2 = payload.filter(
        (item: any) => item.title && item.day && item.id
      );
      temp2.forEach((itm: any) => {
        const index = temp?.indexOf(itm.id);
        if (index >= 0) {
          state[index] = itm;
        }
      });
      return [
        ...state,
        ...temp2.filter((item: any) => !temp.includes(item.id)),
      ];
    case "update":
      return state.map((event: any) =>
        event.id === payload.id ? payload : event
      );
    case "delete":
      return state.filter((event: any) => event.id !== payload.id);
    default:
      throw new Error();
  }
}

interface IMainContextProviderProps extends PropsWithChildren {}
const MainContextProvider = ({ children }: IMainContextProviderProps) => {
  const [monthIndex, setMonthIndex] = useState<any>(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<any>(null);
  const [daySelected, setDaySelected] = useState<any>(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [calendarView, setCalendarView] = useState<string>("month");
  const [labels, setLabels] = useState<any>([]);
  const [user] = useAuthState(auth);
  function initEvents() {
    const storageEvents: any = localStorage.getItem(`savedEvents-${user?.uid}`);
    const parsedEvents =
      storageEvents != undefined && storageEvents != null
        ? JSON.parse(storageEvents)
        : [];
    return parsedEvents;
  }
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((event: any) =>
      labels
        .filter((lbl: any) => lbl.checked)
        .map((lbl: any) => lbl.label)
        .includes(event.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem(
      `savedEvents-${user?.uid}`,
      JSON.stringify(savedEvents)
    );
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels: any) => {
      return [
        ...(new Set(
          savedEvents.map((event: any) => event.label)
        ) as unknown as Array<any>),
      ].map((label) => {
        const currentLabel = prevLabels.find((lbl: any) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label: any) {
    setLabels(
      labels.map((lbl: any) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <MainContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        calendarView,
        setCalendarView,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
