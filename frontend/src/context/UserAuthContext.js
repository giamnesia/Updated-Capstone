import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "https://localhost:3001/login",
    // This must be true.
    handleCodeInApp: false,
    iOS: {
      bundleId: "com.example.ios",
    },

    dynamicLinkDomain: "example.page.link",
  };
  const [authorize, setAuthorize] = useState(
    false || window.localStorage.getItem("authorize") === "true"
  );
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email, password, displayName) {
    return await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    ).then(() => {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          console.log(displayName);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function verifyEmail(email) {
    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
  }
  function sendEmail(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function changePass(currentPassword, newPassword){
  
      var user = auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        console.log("Password updated!");
      }).catch((error) => { console.log(error); });
    
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      currentuser.getIdToken(true).then((token) => {
        setToken(token);
      });

      if (currentuser) {
        window.localStorage.setItem("authorize", "true");
        setAuthorize(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        token,
        authorize,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        verifyEmail,
        sendEmail,
        changePass
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}