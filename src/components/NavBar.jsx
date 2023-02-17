import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { signOut } from "firebase/auth";

function NavBar({ isAuth, setAuth, updateUserId }) {
  const [isOpen, setOpen] = useState(false);
  const [aboutHover, setAboutHover] = useState(false);
  const [skillsHover, setSkillsHover] = useState(false);
  const [projectsHover, setProjectsHover] = useState(false);
  const [experienceHover, setExperienceHover] = useState(false);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("isEditing", false);
        localStorage.setItem("uid", auth.currentUser.uid);
        setAuth(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setAuth(false);

      window.location.pathname = "/";
    });
  };

  return (
    <>
      <div className=" pt-10 md:mx-5 flex flex-row justify-between">
        <span className="ml-2 md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            className="cursor-pointer"
          />
        </span>
        <ul className="mx-10 text-gray-500 flex flex-row items-baseline justify-evenly w-96 hidden md:flex">
          <Link
            to="/"
            className={
              aboutHover ? "underline cursor-pointer" : "cursor-pointer"
            }
            onMouseEnter={() => setAboutHover(true)}
            onMouseLeave={() => setAboutHover(false)}
          >
            About
          </Link>
          <Link
            to="/courses"
            className={
              skillsHover
                ? "underline mt-3 cursor-pointer"
                : "mt-3 cursor-pointer"
            }
            onMouseEnter={() => setSkillsHover(true)}
            onMouseLeave={() => setSkillsHover(false)}
            onClick={() => scrollToSection(Skills)}
          >
            Courses
          </Link>
          <Link
            to="/resumes"
            className={
              projectsHover
                ? "underline mt-3 cursor-pointer"
                : "mt-3 cursor-pointer"
            }
            onMouseEnter={() => setProjectsHover(true)}
            onMouseLeave={() => setProjectsHover(false)}
          >
            Resumes
          </Link>
          {isAuth && (
            <Link
              to="/profile"
              className={
                experienceHover
                  ? "underline mt-3 cursor-pointer"
                  : "mt-3 cursor-pointer"
              }
              onMouseEnter={() => setExperienceHover(true)}
              onMouseLeave={() => setExperienceHover(false)}
              onClick={() => scrollToSection(Experience)}
            >
              Profile
            </Link>
          )}
        </ul>
        {!isAuth && (
          <p
            onClick={signInWithGoogle}
            className="mr-10 pt-4 cursor-pointer text-gray-500"
          >
            Sign In
          </p>
        )}
        {isAuth && (
          <p onClick={signUserOut} className="mr-10 pt-4 cursor-pointer">
            Sign Out
          </p>
        )}
      </div>
      {isOpen && (
        <ul className="ml-4 flex flex-col md:invisible text-gray-500">
          <Link
            to="/"
            className={
              aboutHover ? "underline cursor-pointer" : "cursor-pointer"
            }
            onMouseEnter={() => setAboutHover(true)}
            onMouseLeave={() => setAboutHover(false)}
          >
            About
          </Link>
          <Link
            to="/courses"
            className={
              skillsHover
                ? "underline mt-3 cursor-pointer"
                : "mt-3 cursor-pointer"
            }
            onMouseEnter={() => setSkillsHover(true)}
            onMouseLeave={() => setSkillsHover(false)}
          >
            Courses
          </Link>
          <Link
            to="/resumes"
            className={
              projectsHover
                ? "underline mt-3 cursor-pointer"
                : "mt-3 cursor-pointer"
            }
            onMouseEnter={() => setProjectsHover(true)}
            onMouseLeave={() => setProjectsHover(false)}
          >
            Resumes
          </Link>
          {isAuth && (
            <Link
              to="/profile"
              className={
                experienceHover
                  ? "underline mt-3 cursor-pointer"
                  : "mt-3 cursor-pointer"
              }
              onMouseEnter={() => setExperienceHover(true)}
              onMouseLeave={() => setExperienceHover(false)}
            >
              Profile
            </Link>
          )}
        </ul>
      )}
    </>
  );
}

export default NavBar;
