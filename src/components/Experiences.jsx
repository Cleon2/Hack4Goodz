import { React, useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";

function Experiences({ getInputs, setGetInputs }) {
  const userId = localStorage.getItem("uid");

  //collecting inputs
  const [inputs, setInputs] = useState({
    type: "",
    description: "",
  });

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    // console.log(inputs);
  };

  const { type, description } = inputs;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const docRef = collection(db, "profile", `${userId}entries`, "jobs");
      const docRef = collection(db, "profile", `${userId}`, "jobs");
      await addDoc(docRef, {
        type: inputs.type,
        description: inputs.description,
      });
      setInputs({
        type: "",
        description: "",
      });
      // setGetInputs(getInputs);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [exInputs, setExInputs] = useState([]);

  const getExperiences = () => {
    const q = query(
      collection(db, "profile", `${userId}`, "jobs"),
      orderBy("type")
    );
    onSnapshot(q, (querySnapshot) => {
      setExInputs(
        querySnapshot.docs.map((doc) => ({
          type: doc.data().type,
          description: doc.data().description,
          id: doc.id,
        }))
      );
    });
    console.log(exInputs);
  };

  //getting inputs
  //   const [getInputs, setGetInputs] = useState([]);
  //   useEffect(() => {
  //     const q = query(
  //       collection(db, "profile", `${userId}entries`, "jobs"),
  //       orderBy("type")
  //     );
  //     onSnapshot(q, (querySnapshot) => {
  //       setGetInputs(
  //         querySnapshot.docs.map((doc) => ({
  //           type: doc.data().type,
  //           description: doc.data().description,
  //           id: doc.id,
  //         }))
  //       );
  //     });
  //     console.log(getInputs);
  //   }, []);

  const handleDelete = async (e) => {
    const id = e.target.value;
    console.log(id);
    const taskDocRef = doc(db, "profile", `${userId}`, "jobs", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getExperiences();
  }, []);

  return (
    <div className="bg-white w-[800px] mx-auto rounded-md mt-6 py-4">
      <h1 className="font-bold ml-20">Experiences</h1>
      <div>
        <fieldset>
          <select
            name="type"
            value={type}
            onChange={(e) => onChange(e)}
            className="ml-20"
          >
            <option value="" defaultValue={"default"} disabled="disabled">
              Job Experiences/Skills
            </option>
            <option value="Job">Job</option>
            <option value="Skill">Skill</option>
          </select>
        </fieldset>
        <div className="flex flex-col items-start">
          <textarea
            name="description"
            value={description}
            placeholder="Write description here..."
            onChange={(e) => onChange(e)}
            className="w-[650px] h-40 ml-20 border-2 rounded border-gray-200"
          />
          <button
            onClick={onSubmit}
            className="bg-pink-200 rounded py-2 px-4 mt-2 ml-20"
          >
            Submit
          </button>
        </div>
      </div>
      {exInputs.map((input) => {
        return (
          <div className="ml-20 mb-10 border w-[650px] px-4 py-4 rounded mt-4">
            <h1 className="font-bold">{input.type}</h1>
            <p>{input.description}</p>
            <button
              value={input.id}
              onClick={(e) => handleDelete(e)}
              className="bg-pink-200 rounded px-2 py-1 text-xs"
            >
              Delete Experience
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Experiences;
