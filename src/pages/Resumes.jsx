import { React, useState, useEffect, useMemo, useLayoutEffect } from "react";
import TimeBar from "../components/TimeBar";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  collectionGroup,
  query,
  FieldPath,
  documentId,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";

function Resumes({}) {
  const [resumeData, setResumeData] = useState([]);
  const [idList, setIdList] = useState([]);
  const [imgList, setImgList] = useState([]);

  const zip = (a, b) => a.map((k, i) => [k, b[i]]);

  const takeData = async () => {
    const colRef = collection(db, "profile");
    // const q = query(colRef, orderBy("author", "name"));
    const data = await getDocs(colRef);
    // const data = await getDocs(q);
    // onSnapshot(q, (querySnapshot) => {
    //   setResumeData(querySnapshot.docs.map((doc) => doc.data()));
    // });
    const mappedData = data.docs.map((docs) => {
      return docs.data();
    });
    const idData = mappedData.map((data) => {
      return data.author.id;
    });
    for (var i = 0; i < idData.length; i++) {
      const ref = collection(db, "profile", idData[i], "jobs");
      console.log("AWIDNAWOIDNAWONDOANDW");
      const jobData = await getDocs(ref);
      const temp = [];
      jobData.forEach((e) => {
        temp.push(e.data());
      });
      mappedData[i].jobs = temp;
    }
    // setIdList(idData);
    // const arr = [];
    // for (var id of idList) {
    //   const pathReference = ref(storage, `/${id}/profile`);
    //   try {
    //     await getDownloadURL(pathReference).then((url) => {
    //       arr.push(url);
    //     });
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // }
    // console.log(arr);
    // // setImgList(arr);
    // const temp = zip(mappedData, arr);
    // setResumeData(temp);
    setResumeData(mappedData);
  };

  // const imgData = async () => {
  //   const arr = [];
  //   for (var id of idList) {
  //     const pathReference = ref(storage, `/${id}/profile`);
  //     try {
  //       await getDownloadURL(pathReference).then((url) => {
  //         arr.push(url);
  //       });
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   }
  //   setImgList(arr);
  // };

  useEffect(() => {
    takeData();
    // imgData();
    // const temp = zip(resumeData, imgList);
    // setResumeData(temp);
    console.log(resumeData);
    // console.log("AOWNFWAODNOWANDINWADNIWADA");

    // takeImages();
  }, []);

  //   const pathReference = ref(storage, `/${userId}/profile`);

  //   const getImage = async () => {
  //     try {
  //       getDownloadURL(pathReference).then((url) => {
  //         setImgUrl(url);
  //       });
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };
  return (
    <div className="grid grid-cols-1 place-items-center mt-10 h-screen overflow-y-scroll">
      <div className="w-[800px] mx-auto rounded-lg px-20 py-4 mt-[40px]">
        {resumeData.map((e) => {
          return (
            <div className="m-10 bg-pink-200 p-10 rounded-lg shadow-lg">
              <img
                src={e.img}
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              <div className="flex justify-center mt-4">
                <h1 className="text-center text-amber-800 font-sans font-bold text-xl ml-1">
                  {e.inputs.name}
                </h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-center text-amber-800 font-sans font-medium text-md italic">
                  {e.inputs.email}
                </h1>
              </div>
              <div className="flex justify-center mt-4">
                <h1 className="text-center text-amber-800 font-sans font-medium text-md">
                  {e.inputs.educationLevel}
                </h1>
              </div>
              <h1 className="text-center text-amber-800 font-bold mt-3">
                Skills/Experiences
              </h1>
              {e.jobs.map((job) => {
                return (
                  <h1 className="text-center bg-red-300 rounded-lg py-2 mt-2">
                    {job.description}
                  </h1>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Resumes;
