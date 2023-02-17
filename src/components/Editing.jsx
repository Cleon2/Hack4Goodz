import { React, useState, useEffect } from "react";
import {
  setDoc,
  deleteDoc,
  doc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  connectStorageEmulator,
} from "firebase/storage";

import EditingTime from "./EditingTime";
import Experiences from "./Experiences";

function Editing({
  profileList,
  imgUrl,
  setImgUrl,
  time,
  setHaveProfile,
  daysUsed,
  setProfileList,
  setTime,
  getInputs,
  setGetInputs,
}) {
  //text data collection
  const userId = localStorage.getItem("uid");

  let isFormValid = true;

  const onChange = (e) => {
    setProfileList({ ...profileList, [e.target.name]: e.target.value });
  };

  const { name, email, mobileNumber, educationLevel } = profileList;

  //form validation
  const handleValidation = () => {
    const errors = {
      name: "",
      email: "",
      mobileNumber: "",
      educationLevel: "",
      pictureUpload: "",
    };
    if (name === "") {
      isFormValid = false;
      return "Please enter your full name";
    }
    if (email === "") {
      isFormValid = false;
      // alert("email");
      return "Please enter your email";
    }
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      isFormValid = false;
      // alert("email");
      return "Please enter a valid email";
    }
    const phoneRegex = /^(6|8|9)\d{7}$/;
    if (mobileNumber === "") {
      isFormValid = false;
      // alert("no");
      return "Please enter your phone number";
    }
    if (!mobileNumber.match(phoneRegex)) {
      isFormValid = false;
      // alert("no");
      return "Please enter a valid phone number";
    }
    if (educationLevel == "default") {
      isFormValid = false;
      // alert("education");
      return "Please select your education level";
    }
    return "";
  };

  // const profileCollectionRef = collection(db, "profile");
  const profileDoc = doc(db, "profile", userId);

  //submiting form, passing data to firebase
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const formErr = handleValidation();

      if (isFormValid) {
        const inputs = profileList;
        await deleteDoc(profileDoc);
        await setDoc(profileDoc, {
          author: {
            name: auth.currentUser.displayName,
            id: userId,
          },
          inputs,
          img: imgUrl,
        });
        // window.location.pathname = "/profile";
        setHaveProfile(true);
        alert("Profile updated!");
      } else {
        alert(formErr);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //profile picture collection
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [uploaded, updateUploaded] = useState(false);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  //passing profile picture to firebase
  async function handleUpload() {
    if (!file) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/${userId}/profile`);
    if (!storageRef) {
      deleteObject(storageRef);
    }
    // console.log("asdiasd");
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
        updateUploaded(true);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImgUrl(url);
        });
      }
    );
  }

  useEffect(() => {
    // console.log("editing");
    // console.log(time[0]);
    // console.log(getInputs);
  });

  return (
    <div className="bg-red-100 h-full">
      <div
        id="text input area"
        className="bg-white w-[800px] mx-auto rounded-lg px-20 py-4 mt-[40px]"
      >
        <section>
          <h2 className="font-bold">Name</h2>
          <input
            type="text"
            placeholder="  Full Name..."
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
            className="bg-gray-100 w-[640px] h-10 rounded-md mt-2 rounded-md"
          />
        </section>
        <section className="mt-2">
          <h2 className="font-bold">Email</h2>
          <input
            type="email"
            placeholder="   Email..."
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
            className="w-[640px] h-10  bg-gray-100 mt-2 rounded-nd"
          />
        </section>
        <section className="mt-2">
          <h2 className="font-bold">Phone Number</h2>
          <input
            type="tel"
            placeholder="   Phone Number..."
            pattern="[8-9]-------"
            name="mobileNumber"
            value={mobileNumber}
            onChange={(e) => onChange(e)}
            required
            className="w-[640px] h-10 bg-gray-100 mt-2 rounded-md"
          />
        </section>
        <section className="mt-2">
          <h2 className="font-bold">Education Level</h2>
          <fieldset>
            <select
              name="educationLevel"
              value={educationLevel}
              onChange={(e) => onChange(e)}
              required
              className="w-[640px] h-10 bg-gray-100 mt-2 rounded-md"
            >
              <option value="" defaultValue={"default"} disabled="disabled">
                -- select one --
              </option>
              <option value="No formal education">No formal education</option>
              <option value="Primary education">Primary education</option>
              <option value="Secondary education">
                Secondary education or high school
              </option>
              <option value="Diploma">Diploma</option>
              <option value="Vocational qualification">
                Vocational qualification
              </option>
              <option value="Bachelor's degree">Bachelor's degree</option>
              <option value="Master's degree">Master's degree</option>
              <option value="Doctorate or higher">Doctorate or higher</option>
            </select>
          </fieldset>
        </section>
        <section>
          <img src={imgUrl} className=" w-[800px] mt-4 rounded-md mx-auto" />
          <h2 className="font-bold my-2">Upload Profile Picture</h2>
          <input type="file" accept="image/*" onChange={handleChange} />
          <p>{percent} "% done"</p>
          <button
            onClick={handleUpload}
            className="w-[150px] h-10 bg-gray-100 mt-2 rounded-md"
          >
            Upload photo
          </button>
        </section>
        <div>
          <button
            onClick={submitForm}
            className="w-[650px] h-10 bg-pink-200 mt-2 rounded-md font-bold"
          >
            Confirm Personal Details
          </button>
        </div>
      </div>
      <div className="bg-white w-[800px] px-4 py-2 mx-auto mt-6 rounded-lg ">
        {" "}
        <EditingTime time={time} daysUsed={daysUsed} setTime={setTime} />
      </div>
      <Experiences getInputs={getInputs} setGetInputs={setGetInputs} />
    </div>
  );
}

export default Editing;
