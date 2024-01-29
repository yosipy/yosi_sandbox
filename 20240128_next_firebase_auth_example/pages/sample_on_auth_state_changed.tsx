import { FC, useEffect } from "react";

import { useUser, withUser } from "next-firebase-auth";
import { getAuth } from "firebase/auth";

const Index: FC = () => {
  const currenUser = useUser();
  console.log(
    `currenUser.clientInitialized: ${
      currenUser.clientInitialized
    } (${new Date()})`
  );

  const auth = getAuth();
  useEffect(() => {
    const unsubscribeOnAuthStateChanged = auth.onAuthStateChanged(
      (onAuthStateChangedUser) => {
        console.log(
          `onAuthStateChangedUser: ${onAuthStateChangedUser} (${new Date()})`
        );
      },
      (error) => {
        console.error("useFirebaseAuth:", error);
      }
    );

    return () => {
      unsubscribeOnAuthStateChanged();
    };
  }, []);

  return (
    <>
      <p>onAuthStateChanged</p>
    </>
  );
};

export default withUser()(Index);

// Log
//
// Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
// initAuth.js:24 next-firebase-auth [init] Setting config with provided value: {debug: true, loginAPIEndpoint: '/api/login', logoutAPIEndpoint: '/api/logout', authPageURL: ƒ, appPageURL: ƒ, …}
// initAuth.js:24 next-firebase-auth [init] Initialized the Firebase JS SDK.
// sample_on_auth_state_changed.tsx:39 next-firebase-auth [withUser] Calling "withUser".
// websocket.js:48 [HMR] connected
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// sample_on_auth_state_changed.tsx:8 currenUser.clientInitialized: false (Mon Jan 29 2024 10:41:51 GMT+0900 (日本標準時))
// api.js?onload=__iframefcb590529:29 Uncaught TypeError: u[v] is not a function
//     at Q.<computed> [as loaded_0] (api.js?onload=__iframefcb590529:29:145)
//     at cb=gapi.loaded_0?le=scs:1:6
// Q.<computed> @ api.js?onload=__iframefcb590529:29
// (anonymous) @ cb=gapi.loaded_0?le=scs:1
// index.browser.js:2 next-firebase-auth [withUser] The Firebase ID token changed. New Firebase user: null
// index.browser.js:2 next-firebase-auth [withUser] Calling the logout endpoint.
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// sample_on_auth_state_changed.tsx:8 currenUser.clientInitialized: true (Mon Jan 29 2024 10:41:51 GMT+0900 (日本標準時))
// index.browser.js:2 next-firebase-auth [withUser] Completed the auth API request.
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// sample_on_auth_state_changed.tsx:8 currenUser.clientInitialized: true (Mon Jan 29 2024 10:41:51 GMT+0900 (日本標準時))
// sample_on_auth_state_changed.tsx:18 onAuthStateChangedUser: null (Mon Jan 29 2024 10:42:21 GMT+0900 (日本標準時))
