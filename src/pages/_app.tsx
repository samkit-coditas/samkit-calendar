import MainPage from "@/components/mainPage/mainPage";
import { useEffect, useState } from "react";
import "./app.css";

function App({ Component, pageProps }: any) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default App;
