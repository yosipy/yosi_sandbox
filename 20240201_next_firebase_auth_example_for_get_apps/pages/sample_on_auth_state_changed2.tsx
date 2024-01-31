import { FC, useEffect } from "react";

import { AuthAction, useUser, withUser } from "next-firebase-auth";
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

export default withUser({
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
})(Index);

// Log(use emulator)
// Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
// initAuth.js:20 WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.
// initAuth.js:24 next-firebase-auth [init] Setting config with provided value: {debug: true, loginAPIEndpoint: '/api/login', logoutAPIEndpoint: '/api/logout', authPageURL: ƒ, appPageURL: ƒ, …}
// initAuth.js:24 next-firebase-auth [init] Initialized the Firebase JS SDK.
// initAuth.js:24 WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.
// sample_on_auth_state_changed2.tsx:41 next-firebase-auth [withUser] Calling "withUser".
// websocket.js:48 [HMR] connected
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// api.js?onload=__iframefcb873588:29 Uncaught TypeError: u[v] is not a function
//     at Q.<computed> [as loaded_0] (api.js?onload=__iframefcb873588:29:145)
//     at cb=gapi.loaded_0?le=scs:1:6
// Q.<computed> @ api.js?onload=__iframefcb873588:29
// (anonymous) @ cb=gapi.loaded_0?le=scs:1
// index.browser.js:2 next-firebase-auth [withUser] The Firebase ID token changed. New Firebase user: null
// index.browser.js:2 next-firebase-auth [withUser] Calling the logout endpoint.
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// index.browser.js:2 next-firebase-auth [withUser] Completed the auth API request.
// index.browser.js:2 next-firebase-auth [withUser] Set user to: {id: null, email: null, emailVerified: false, tenantId: null, phoneNumber: null, …}
// sample_on_auth_state_changed2.tsx:8 currenUser.clientInitialized: true (Mon Jan 29 2024 12:40:31 GMT+0900 (日本標準時))
// sample_on_auth_state_changed2.tsx:18 onAuthStateChangedUser: null (Mon Jan 29 2024 12:41:01 GMT+0900 (日本標準時))
