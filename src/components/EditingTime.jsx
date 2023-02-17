import { React, useState, useEffect } from "react";
import { setDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import TimePickerComponent from "./TimePickerComponent";

function EditingTime({ time, setTime }) {
  //time picker
  const format = "HH:mm";

  //dates chosen
  const [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //set date to true/false
  const setDay = (index) => (e) => {
    const temp = [...days];
    let bool;
    if (e.target.value == "false") {
      bool = true;
    } else {
      bool = false;
    }
    temp[index] = bool;
    setDays(temp);
    // console.log(days);
  };

  //form validation
  const handleForm = () => {
    for (var i = 0; i < 7; i++) {
      if (days[i]) {
        if (time[i].start == "" || time[i].end == "") {
          return false;
        }
      }
    }
    return true;
  };

  //passing time info to firebase
  const userId = localStorage.getItem("uid");
  // const timeDoc = doc(db, "profile", `${userId}time`);
  const timeDoc = doc(db, "profile", `${userId}`, "time", "schedule");

  //submiting form, passing data to firebase
  async function submitForm(e) {
    e.preventDefault();
    try {
      if (handleForm()) {
        await deleteDoc(timeDoc);
        await setDoc(timeDoc, {
          author: {
            name: auth.currentUser.displayName,
            id: userId,
          },
          time,
        });
        alert("Timeslots updated!");
      } else {
        alert("Please fill in the timeslots");
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    console.log("editingtime");
  }, []);

  return (
    <div id="timeslot input area">
      <div>
        <section>
          <h1 className="text-center font-bold text-2xl">
            Current Kidney Dialysis Schedule
          </h1>
          <TimePickerComponent
            id="m"
            day="Monday"
            setTime={setTime}
            time={time}
            intValue={0}
            value={time[0]}
          />
          <TimePickerComponent
            id="t"
            day="Tuesday"
            setTime={setTime}
            time={time}
            intValue={1}
            value={time[1]}
          />
          <TimePickerComponent
            id="w"
            day="Wednesday"
            setTime={setTime}
            time={time}
            intValue={2}
            value={time[2]}
          />
          <TimePickerComponent
            id="th"
            day="Thursday"
            setTime={setTime}
            time={time}
            intValue={3}
            value={time[3]}
          />
          <TimePickerComponent
            id="f"
            day="Friday"
            setTime={setTime}
            time={time}
            intValue={4}
            value={time[4]}
          />
          <TimePickerComponent
            id="s"
            day="Saturday"
            setTime={setTime}
            time={time}
            intValue={5}
            value={time[5]}
          />
          <TimePickerComponent
            id="su"
            day="Sunday"
            setTime={setTime}
            time={time}
            intValue={6}
            value={time[6]}
          />
        </section>
        <div>
          <button
            onClick={submitForm}
            className="bg-rose-200 px-4 py-2 rounded-md font-bold"
          >
            Confirm dialysis schedule
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditingTime;
