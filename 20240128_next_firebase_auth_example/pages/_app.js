import React from "react";
import "../styles/globals.css";
import initAuth from "../utils/initAuth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const useEmulator = false;

initAuth(useEmulator);

if (useEmulator) {
  const db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8080);
}

const MyApp = ({ Component, pageProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);

export default MyApp;
