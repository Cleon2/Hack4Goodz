import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React, useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth, storage, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";

import Loading from "./Loading";

function App() {
  const [userId, setUserId] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("isEditing", false);
        localStorage.setItem("uid", auth.currentUser.uid);
        setUserId(auth.currentUser.uid);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div>
      {localStorage.getItem("isAuth") ? (
        <Loading userId={userId} />
      ) : (
        <div className="bg-red-100 h-screen flex">
          <div className="m-auto">
            <button
              className="login-with-google-btn login-with-google-btn:hover login-with-google-btn:focus login-with-google-btn:active"
              onClick={signInWithGoogle}
            >
              Sign in With Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
