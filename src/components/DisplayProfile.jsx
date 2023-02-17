import { React, useState, useEffect } from "react";
import TimeBar from "./TimeBar";

function DisplayProfile({
  profileList,
  imgUrl,
  time,
  haveTime,
  getInputs,
  userId,
}) {
  // const userId = localStorage.getItem("uid");

  const { name, email, mobileNumber, educationLevel } = profileList;

  // const handleDelete = async (e) => {
  //   const id = e.target.value;
  //   const taskDocRef = doc(db, "profile", `${userId}entries`, "jobs", id);
  //   try {
  //     await deleteDoc(taskDocRef);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  return (
    <div>
      <div>
        <div className="flex flex-row">
          <div className="h-70 w-[700px] bg-red-200">
            <div className="mb-4">
              <img
                src={imgUrl}
                className="w-40 h-40 rounded-full ml-20 mt-10"
              />
              <h1 className="font-bold text-yellow-900 text-xl ml-28 mt-3">
                {name}
              </h1>
            </div>
          </div>
          <div
            className="flex border-t-[150px] border-t-transparent
    border-l-[80px] border-l-red-200
    border-b-[120px] border-b-transparent relative"
          >
            <div className="absolute flex  -ml-[290px]  :md-ml-[500px]  -mt-36">
              <div className="flex flex-col ml-10 mt-10">
                <div>
                  <h1 className=" text-yellow-900">Email</h1>
                  <h1 className="text-red-600">{email}</h1>
                </div>
                <div className="mt-3">
                  <h1 className="text-yellow-900">Contact Number</h1>
                  <h1 className="text-red-600">{mobileNumber}</h1>
                </div>
                <div className="mt-3">
                  <h1 className=" text-yellow-900">Education Level</h1>
                  <h1 className="text-red-600">{educationLevel}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-screen bg-mudPink">
          <h1 className="font-bold text-2xl pl-4 bg-red-200">
            Dialysis Schedule
          </h1>
          {haveTime ? (
            time.map((day, index) => {
              if (day.start !== "" && day.end !== "") {
                let whichDay;

                switch (index) {
                  case 0:
                    whichDay = "Monday";
                    break;
                  case 1:
                    whichDay = "Tuesday";
                    break;
                  case 2:
                    whichDay = "Wednesday";
                    break;
                  case 3:
                    whichDay = "Thursday";
                    break;
                  case 4:
                    whichDay = "Friday";
                    break;
                  case 5:
                    whichDay = "Saturday";
                    break;
                  case 6:
                    whichDay = "Sunday";
                    break;
                }
                return (
                  <div className="bg-red-200">
                    <p className="text-xl font-bold py-4 underline ml-4">
                      {whichDay}
                    </p>
                    <TimeBar startTime={day.start} endTime={day.end} />
                  </div>
                );
              }
            })
          ) : (
            <div></div>
          )}
          <h1 className="font-bold text-2xl  bg-red-200 py-10 pl-4">
            Experiences
          </h1>
          {getInputs.map((input) => (
            <div className="bg-red-200 flex flex-row ml-8">
              <div className="bg-white w-[800px] px-4 py-4 rounded border py-2">
                <h1 className="font-bold">{input.type}</h1>
                <p>{input.description}</p>
                {/* <button
                  value={input.id}
                  onClick={(e) => handleDelete(e)}
                  className="bg-pink-200 rounded px-2 py-1 text-xs"
                >
                  Delete Experience
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayProfile;
