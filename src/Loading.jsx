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
import { db, auth, storage } from "./firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

//pages
import About from "./pages/About";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import NewPage from "./pages/NewPage";
import Design from "./pages/Design";
import Data from "./pages/Data";
import Resumes from "./pages/Resumes";
import { getStepIconUtilityClass } from "@mui/material";

function Loading() {
  const [isAuth, setAuth] = useState(localStorage.getItem("isAuth"));
  const [info, setInfo] = useState({});

  const userId = localStorage.getItem("uid");

  //get profile data from firebase
  const [profileList, setProfileList] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    educationLevel: "",
  });
  const colRef = collection(db, "profile");
  const profileDoc = doc(db, "profile", userId);
  const [haveProfile, setHaveProfile] = useState(true);
  const getProfile = async () => {
    try {
      const data = await getDoc(profileDoc);
      if (!(data.data() == undefined)) {
        setProfileList(data.data().inputs);
        console.log(profileList);
      } else {
        setHaveProfile(false);
      }
      // console.log(profileList);
    } catch (err) {
      console.error(err.message);
    }
  };

  //   display profile pic
  const pathReference = ref(storage, `/${userId}/profile`);
  const [imgUrl, setImgUrl] = useState("");
  const getImage = async () => {
    try {
      await getDownloadURL(pathReference).then((url) => {
        setImgUrl(url);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  //display schedule
  const [time, setTime] = useState([
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
  ]);
  const [haveTime, setHaveTime] = useState(false);
  // const timeDoc = doc(db, "profile", `${userId}time`);
  const timeDoc = doc(db, "profile", `${userId}`, "time", "schedule");
  const getTime = async () => {
    try {
      const data = await getDoc(timeDoc);
      if (data.data() !== undefined) {
        setTime(data.data().time);
        setHaveTime(true);
        console.log("get time");
        console.log(time);
        console.log(time === undefined);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //get experiences
  const [getInputs, setGetInputs] = useState([]);
  const getExperiences = () => {
    const q = query(
      collection(db, "profile", `${userId}`, "jobs"),
      orderBy("type")
    );
    onSnapshot(q, (querySnapshot) => {
      setGetInputs(
        querySnapshot.docs.map((doc) => ({
          type: doc.data().type,
          description: doc.data().description,
          id: doc.id,
        }))
      );
    });
    console.log(getInputs);
  };
  useEffect(() => {
    getExperiences;
  }, []);

  useEffect(() => {
    getProfile();
    getImage();
    getTime();
    // if (!haveProfile) {
    //   localStorage.setItem("isEditing", false);
    // } else {
    //   localStorage.setItem("isEditing", true);
    // }
    // setIsEditing(localStorage.getItem("isEditing"));
    // console.log(time);
    // if (!localStorage.getItem("isAuth")) {
    //   window.location.pathname = "/about";
    // }
  }, []);

  return (
    <div className="bg-red-100 min-h-screen">
      <BrowserRouter>
        <NavBar isAuth={isAuth} setAuth={setAuth} />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/resumes"
            element={
              <Resumes imgUrl={imgUrl} profileList={profileList} time={time} />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                setInfo={setInfo}
                profileList={profileList}
                setProfileList={setProfileList}
                userId={userId}
                haveProfile={haveProfile}
                setHaveProfile={setHaveProfile}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
                getImage={getImage}
                getProfile={getProfile}
                time={time}
                setTime={setTime}
                getTime={getTime}
                haveTime={haveTime}
                setHaveTime={setHaveTime}
                getInputs={getInputs}
                setGetInputs={setGetInputs}
                getExperiences={getExperiences}
              />
            }
          />
          <Route path="/it" element={<NewPage />} />
          <Route path="/design" element={<Design />} />
          <Route path="/Data" element={<Data />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Loading;
