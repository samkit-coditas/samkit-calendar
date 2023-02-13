import MainPage from "@/components/mainPage/mainPage";
import { useState, useEffect } from "react";

export default function Home() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
  }, []);
  return <>{load && <MainPage />}</>;
}
