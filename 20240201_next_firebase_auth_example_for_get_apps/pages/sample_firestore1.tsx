import { FC, useEffect, useState } from "react";

import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { withUser } from "next-firebase-auth";
import { getAuth } from "firebase/auth";

const Index: FC = () => {
  const [articleIds, setArticleIds] = useState<string[]>([]);

  const db = getFirestore();

  const fetch = async () => {
    console.log("Fetch start: " + new Date());

    const articlesSnap = await getDocs(
      query(
        collection(db, "articles"),
        where("public", "==", true),
        orderBy("createdAt", "desc"),
        limit(20)
      )
    );
    const fetchedArticleIds = articlesSnap.docs.map((doc) => doc.id);
    setArticleIds(fetchedArticleIds);

    console.log("Fetch end: " + new Date());
  };

  const auth = getAuth();
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <p>articleIds</p>
      {articleIds.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </>
  );
};

export default withUser()(Index);

// It may take about 30 seconds for the id array to be displayed.

// Log(not use emulator)
//
// Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
// initAuth.js:24 next-firebase-auth [init] Setting config with provided value: {debug: true, loginAPIEndpoint: '/api/login', logoutAPIEndpoint: '/api/logout', authPageURL: ƒ, appPageURL: ƒ, …}
// initAuth.js:24 next-firebase-auth [init] Initialized the Firebase JS SDK.
// sample_firestore1.tsx:52 next-firebase-auth [withUser] Calling "withUser".
// websocket.js:48 [HMR] connected
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// sample_firestore1.tsx:21 Fetch start: Mon Jan 29 2024 10:43:44 GMT+0900 (日本標準時)
// api.js?onload=__iframefcb846299:29 Uncaught TypeError: u[v] is not a function
//     at Q.<computed> [as loaded_0] (api.js?onload=__iframefcb846299:29:145)
//     at cb=gapi.loaded_0?le=scs:1:6
// Q.<computed> @ api.js?onload=__iframefcb846299:29
// (anonymous) @ cb=gapi.loaded_0?le=scs:1
// index.browser.js:2 next-firebase-auth [withUser] The Firebase ID token changed. New Firebase user: null
// index.browser.js:2 next-firebase-auth [withUser] Calling the logout endpoint.
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// index.browser.js:2 next-firebase-auth [withUser] Completed the auth API request.
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// sample_firestore1.tsx:34 Fetch end: Mon Jan 29 2024 10:44:15 GMT+0900 (日本標準時)
