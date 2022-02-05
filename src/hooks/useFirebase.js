import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import initializeFirebase from "../Firebase/firebase.init";
import { useEffect, useState } from "react";
initializeFirebase();
const useFirebase = () => {
  const [users, setUsers] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  // register system
  const registerEmail = (email, password, name, role, location, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const newUser = { email, displayName: name };
        // save data
        saveData(email, name, role);
        setUsers(newUser);
        navigate(location?.state?.from || "/home");
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            setError("");
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  // Login
  const logIn = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError(" ");
        navigate(location?.state?.from || "/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };
  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
      } else {
        setUsers({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);
  // logout
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUsers("");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // save database
  const saveData = (email, displayName, role) => {
    const user = { email, displayName, role };
    fetch("https://whispering-woodland-96025.herokuapp.com/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };
  return {
    users,
    error,
    isLoading,
    registerEmail,
    logIn,
    logOut,
  };
};
export default useFirebase;
