import { React, useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import Editing from "../components/Editing";
import DisplayProfile from "../components/DisplayProfile";

function Profile() {
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
        console.log("your mother not die");
        console.log(profileList);
      } else {
        console.log("your mother die");
        setHaveProfile(false);
      }
      console.log(profileList);
    } catch (err) {
      console.error(err.message);
    }
  };

  //   display profile pic
  const pathReference = ref(storage, `/${userId}/profile`);
  const [imgUrl, setImgUrl] = useState("");
  const getImage = async () => {
    try {
      getDownloadURL(pathReference).then((url) => {
        setImgUrl(url);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  //find days used
  const [daysUsed, setDaysUsed] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //display schedule
  const [time, setTime] = useState({});
  const [haveTime, setHaveTime] = useState(false);
  const timeDoc = doc(db, "profile", `${userId}time`);
  const getTime = async () => {
    try {
      const data = await getDoc(timeDoc);
      if (data.data() !== undefined) {
        setTime(data.data().time);
        setHaveTime(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //toggle editing and display pages
  const [isEditing, setIsEditing] = useState(localStorage.getItem("isEditing"));
  const toggleElements = () => {
    console.log(haveProfile);
    if (haveProfile) {
      localStorage.setItem("isEditing", !localStorage.getItem("isEditing"));
      setIsEditing(!localStorage.getItem("isEditing"));
    } else {
      alert("profile incomplete!");
    }
  };

  //render data
  useEffect(() => {
    getProfile();
    getImage();
    getTime();
    console.log("profileuseeffect");
  }, []);

  return (
    <div>
      {isEditing ? (
        <Editing
          profileList={profileList}
          imgUrl={imgUrl}
          time={time}
          setHaveProfile={setHaveProfile}
        />
      ) : (
        <DisplayProfile
          profileList={profileList}
          imgUrl={imgUrl}
          time={time}
          setTime={setTime}
          haveTime={haveTime}
        />
      )}
      <div>
        {!isEditing ? (
          <button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edit
          </button>
        ) : (
          <button onClick={toggleElements}>Save Changes</button>
        )}
      </div>
    </div>
  );
}

export default Profile;
