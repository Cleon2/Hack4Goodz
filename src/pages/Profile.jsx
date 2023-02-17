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
import { db, auth, storage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import Editing from "../components/Editing";
import DisplayProfile from "../components/DisplayProfile";

function Profile({
  setInfo,
  profileList,
  setProfileList,
  userId,
  haveProfile,
  setHaveProfile,
  imgUrl,
  setImgUrl,
  getProfile,
  getImage,
  time,
  setTime,
  getTime,
  haveTime,
  setHaveTime,
  getInputs,
  setGetInputs,
  getExperiences,
}) {
  //toggle editing and display pages
  const [isEditing, setIsEditing] = useState(localStorage.getItem("isEditing"));
  const toggleElements = () => {
    getImage();
    getTime();
    getExperiences();
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
    if (!haveProfile) {
      localStorage.setItem("isEditing", false);
    } else {
      localStorage.setItem("isEditing", true);
    }
    setIsEditing(localStorage.getItem("isEditing"));
    console.log(time);
    if (!localStorage.getItem("isAuth")) {
      window.location.pathname = "/about";
    }
  }, []);

  return (
    <div>
      {isEditing ? (
        <Editing
          profileList={profileList}
          setProfileList={setProfileList}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          time={time}
          setTime={setTime}
          setHaveProfile={setHaveProfile}
          getInputs={getInputs}
          setGetInputs={setGetInputs}
        />
      ) : (
        <DisplayProfile
          profileList={profileList}
          imgUrl={imgUrl}
          time={time}
          setTime={setTime}
          haveTime={haveTime}
          getInputs={getInputs}
          userId={userId}
        />
      )}

      <div>
        {!isEditing ? (
          <div className="bg-red-200 -mt-4 flex flex-row justify-center">
            <button
              className="bg-white py-3 px-14 rounded-lg my-8"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="bg-red-100">
            <button
              onClick={toggleElements}
              className="rounded bg-rose-200 px-2 py-3 mb-10 mt-6 ml-[330px]"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
